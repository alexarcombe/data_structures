const Node = require('../node/Node');

/**
 * Creates a new empty binary search tree.
 */
function BST() {
  this.size = 0;
  this.root = null;
}

/**
 * Returns the size of the tree.
 * @returns {number} size.
 */
BST.prototype.getSize = function () {
  return this.size;
};

/**
 * Returns true if the tree is Empty.
 * @returns {boolean} empty.
 */
BST.prototype.isEmpty = function () {
  return this.size === 0;
};

/**
 * Inserts an elemnt into the tree, returns true if successful.
 * @param {number} value - Value to insert
 * @returns {boolean} inserted
 * @throws {TypeError}
 */
BST.prototype.insert = function (value) {
  if (!(typeof value === 'number')) {
    throw new TypeError('BST only supporst numbers atm.');
  }
  if (this.isEmpty()) {
    this.root = new Node(value);
    this.size++;
    return true;
  }
  if (insert(value, this.root)) {
    this.size++;
    return true;
  }
  return false;
};

/**
 * Helper function for insert, inserts the value in right position if possible.
 * @param {number} value
 * @param {Node} node
 * @returns {boolean} inserted.
 */
function insert(value, node) {
  const nodeValue = node.getValue();
  if (nodeValue === value) {
    return false;
  } else if (value < nodeValue) {
    if (node.hasPrev()) {
      return insert(value, node.getPrev()); // Walk to the left in the tree.
    } else {
      const newNode = new Node(value);
      return node.setPrev(newNode); // Left is free, put the value here.
    }
  } else {
    if (node.hasNext()) {
      return insert(value, node.getNext()); // Walk to the right of the tree.
    } else {
      const newNode = new Node(value);
      return node.setNext(newNode); // Right is free, put the node here.
    }
  }
}

/**
 * Returns true if tree contains value, otherwise false.
 * @param {number}
 */
BST.prototype.contains = function (value) {
  if (!(typeof value === 'number')) {
    throw new TypeError('BST only supporst numbers atm.');
  }
  if (this.isEmpty()) {
    return false;
  }
  return contains(value, this.root);
};

/**
 * Helper function for contains.
 * @param {number} value
 * @param {Node} node
 */
function contains(value, node) {
  const nodeValue = node.getValue();
  if (nodeValue === value) {
    return true;
  } else if (value < nodeValue) {
    return node.hasPrev() ? contains(value, node.getPrev()) : false;
  } else {
    return node.hasNext() ? contains(value, node.getNext()) : false;
  }
}

/**
 * Depth first traversal over the tree and applies callback function to each node.
 * @param {Function} callback - Then function applied to the elements
 * @param {string} order - The order of traversal
 */
BST.prototype.depthFirstTraversal = function (callback, order = 'preorder') {
  if (this.isEmpty()) {
    return false;
  }
  depthFirstTraversal(callback, this.root, order);
};

/**
 * Helper function for depth first traversal.
 * @param {Function} callback - Then function applied to the elements
 * @param {Node} node - Current node.
 * @param {string} order - The order of traversal
 */
function depthFirstTraversal(callback, node, order) {
  if (order === 'preorder') {
    callback(node);
  }
  if (node.hasPrev()) {
    depthFirstTraversal(callback, node.getPrev(), order);
  }
  if (order === 'inorder') {
    console.log(callback);
    callback(node);
  }
  if (node.hasNext()) {
    depthFirstTraversal(callback, node.getNext(), order);
  }
  if (order === 'postorder') {
    callback(node);
  }
}

/**
 * Breath first traversal over the tree and applies callback to each node.
 * @param {Function} callback - Then function applied to the elements
 */
BST.prototype.breadthFirstTraversal = function (callback) {
  if (this.isEmpty()) {
    return false;
  }
  breadthFirstTraversal(callback, this.root);
};

/**
 * Helper function for breath first traversal.
 * @param {Function} callback - Then function applied to the elements
 * @param {Node} node - Root node.
 */
function breadthFirstTraversal(callback, node) {
  let current;
  const queue = [node];
  while (queue.length) {
    current = queue.shift();
    callback(current);
    if (current.hasPrev()) {
      queue.push(current.getPrev());
    }
    if (current.hasNext()) {
      queue.push(current.getNext());
    }
  }
}

/**
 * Returns the min value of the tree.
 * @returns {number} min
 */
BST.prototype.getMin = function () {
  return getMin(this.root);
};

/**
 * Helper function to find min value
 * @param {Node} node
 * @returns {number} min
 */
function getMin(node) {
  if (node.hasPrev()) {
    return getMin(node.getPrev());
  } else {
    return node.getValue();
  }
}

/**
 * Returns the max value of the tree.
 * @returns {number} max
 */
BST.prototype.getMax = function () {
  return getMax(this.root);
};

/**
 * Helper function to find max value
 * @param {Node} node
 * @returns {number} max
 */
function getMax(node) {
  if (node.hasNext()) {
    return getMax(node.getNext());
  } else {
    return node.getValue();
  }
}

module.exports = BST;
