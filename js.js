class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  build(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let sortedArray = [...new Set(array)].sort((a, b) => a - b);
    let middleIndex = Math.floor((start + end) / 2);
    let node = new Node(sortedArray[middleIndex]);

    node.left = this.buildTree(sortedArray, start, middleIndex - 1);
    node.right = this.buildTree(sortedArray, middleIndex + 1, end);
    return node;
  }

  insert(value) {
    this.root = this.insertHelper(this.root, value);
  }

  insertHelper(node, value) {
    if (node === null) return new Node(value);
    if (value < node.data) {
      node.left = this.insertHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertHelper(node.right, value);
    }
    return node;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let array = this.inOrder(); // Re-use inOrder traversal to get sorted array
    this.root = this.buildTree(array);
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  levelOrder(callback = null) {
    let result = [];
    if (!this.root) return result;
    let queue = [this.root];
    while (queue.length > 0) {
      let node = queue.shift();
      if (callback) callback(node);
      else result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.data);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.data);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.data);
    }
    return result;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

function generateRandomArray(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

// Driver script
const tree = new Tree();
tree.build(generateRandomArray(10));
console.log("Initial tree:");
tree.prettyPrint();

console.log("Is the tree balanced?", tree.isBalanced() ? "Yes" : "No");

tree.insert(105);
tree.insert(120);
console.log("Tree after inserting elements > 100:");
tree.prettyPrint();

console.log(
  "Is the tree balanced after insertions?",
  tree.isBalanced() ? "Yes" : "No"
);

tree.rebalance();
console.log("Tree after rebalancing:");
tree.prettyPrint();

console.log(
  "Is the tree balanced after rebalancing?",
  tree.isBalanced() ? "Yes" : "No"
);
