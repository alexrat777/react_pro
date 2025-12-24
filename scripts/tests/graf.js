const graph = {
    a: ['b', 'c'],
    b: ['e'],
    c: ['d', 'f'],
    d: ['e'],
    e: ['g'],
    f: ['e'],
    g: [],
};

function goGraf(graph, start) {
    // создать массив посещенных
    const visited = new Set();
    // создать очередь
    const queue = [start];
    visited.add(start);
    while (queue.length > 0) {
        const node = queue.shift();
        // обработать соседние узлы
        for (const newNode of graph[node]) {
            if (!visited.has(newNode)) {
                visited.add(newNode);
                queue.push(newNode);
            }
        }
    }
    console.log(visited);
}

// goGraf(graph, 'a');

// обход в глубь

function goGrafDeep(graph, start, end) {
    // создать массив посещенных
    const visited = new Set();
    // создать стек
    const stack = [start];
    while (stack.length > 0) {
        const node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            console.log(node);
            // обработать соседние узлы
            // проход по соседним нодам не пройденым
            for (const newNode of graph[node]) {
                if (newNode === end) return true;
                if (!visited.has(newNode)) {
                    stack.push(newNode);
                }
            }
        }
    }
    return false;
}
const result = goGrafDeep(graph, 'a', 'c');
console.log(result);

console.log('-------------');
function goGrafDeepRecurse(graph, start, end, visited = new Set()) {
    if (!visited.has(start)) {
        visited.add(start);
        console.log(start);
        // обработать соседние узлы
        // проход по соседним нодам не пройденым
        for (const newNode of graph[start]) {
            if (newNode === end) return true;
            const result = goGrafDeepRecurse(graph, newNode, end, visited);
        }
    }
    return result ?? false;
}
const result2 = goGrafDeepRecurse(graph, 'a', 'c');

console.log(result2);
