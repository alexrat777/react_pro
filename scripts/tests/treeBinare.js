class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.value) {
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    return;
                }
                currentNode = currentNode.left;
            } else {
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }

    search(value) {
        let currentNode = this.root;
        while (currentNode) {
            if (value === currentNode.value) return true;
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return false;
    }

    printVisual(node = this.root, prefix = '', isLeft = true) {
        if (!node) return;
        // Правое поддерево печатаем первым(чтобы в консоле дерево было вертикальным
        if (node.right) {
            this.printVisual(node.right, prefix + (isLeft ? '|   ' : '    '), false);
        }
        // текущий узел
        console.log(prefix + (isLeft ? '└── ' : '┌── ') + node.value);

        // левое дерево
        if (node.left) {
            this.printVisual(node.left, prefix + (isLeft ? '    ' : '|   '), true);
        }
    }
}
const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(3);
tree.insert(1711);
tree.insert(1);
tree.insert(4);
tree.insert(6);
tree.insert(11);
tree.insert(4);
tree.insert(1721);

tree.printVisual();
