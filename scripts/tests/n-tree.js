const expectedSum = 59;
const tree = [{
    value: 5,
    children: [
        {
            value: 4,
            children: [
                { value: 7, children: [] },
                { value: 11, children: [{ value: 5, children: [] }] },
            ],
        },
        {
            value: 3,
            children: [{ value: 4, children: [] }],
        },
        {
            value: 7,
            children: [
                { value: 1, children: [] },
                { value: 12, children: [] },
            ],
        },
    ],
}];

function recursive(tree) {
    let sum = 0;
    if (!tree.length) return sum;
    // пройдем по массиву
    for (node of tree) {
        sum += node.value; // просумируем
        sum += recursive(node.children); // сумма нижестоящих нод детей
    }
    return sum;
}
// 1. [5]
// 2. [4, 3, 7]
// 3. [4, 3, 1, 12]
function iterative(tree) {
    let sum = 0;
    const stack = [...tree];
    while (stack.length > 0) {
        const node = stack.pop();
        sum += node.value;
        stack.push(...node.children);
    }
    return sum;
}

console.log(recursive(tree));
console.log(iterative(tree));
