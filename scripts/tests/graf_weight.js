const graph = {
    a: { b: 3, c: 1 },
    b: { e: 6 },
    c: { d: 2, f: 9 },
    d: { e: 3 },
    e: { g: 4 },
    f: { e: 12 },
    g: {},
};

function goGrafWieght(graph, start) {
    // дистанция просмотр
    const distantion = {};
    // создать массив с уже посещенными точками
    const visited = new Set();

    // для сохранения маршруту
    const prev = {};
    // заполнить дистанции бесконечностями
    for (const ver in graph) {
        distantion[ver] = Infinity;
        prev[ver] = null;
    }
    // из точки в саму себя 0
    distantion[start] = 0;
    // ходим по массиву пока количество посещенных точек меньше количества ключей в графе
    while (visited.size < Object.keys(graph).length) {
        // обявить переменные для алгоритма
        let closesVertex = null; // ближайшая вершина от нашей
        let smallDist = Infinity; // дистанция
        // получить все вершины которые есть в графе из массива дистанций
        for (const ver in distantion) {
            // сравнить дистанции
            if (!visited.has(ver) && (distantion[ver] < smallDist)) { // первый раз сработает на 0 в отправной точке и closesVertex будет start
                smallDist = distantion[ver]; // самая малая дистанция
                // ближайшая вершина от нашей
                closesVertex = ver;
            }
        }
        // условие есть ли ближайшая вершина к нашей?
        if (closesVertex === null) break; // если вершина не с кем не связана
        // добавляем вершину в посещенные
        visited.add(closesVertex);
        // главная часть алгоритма!!!!!
        for (const sosed in graph[closesVertex]) {
            // вес текущий и соседние
            const weight = graph[closesVertex][sosed];
            // считаем все от старта до текущей (distantion[closesVertex] является накопительным весом до старта от closesVertex которую сейчас рассматриваем)
            const newWeight = distantion[closesVertex] + weight;
            // если маршрут быстрее то перезаписываем
            if (newWeight < distantion[sosed]) {
                distantion[sosed] = newWeight;
                prev[sosed] = closesVertex;
            }
        }
    }

    // вернуть все дистанции
    return { distantion, prev };
}

console.log(goGrafWieght(graph, 'a'));
