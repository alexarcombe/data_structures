/**
 * Constructor for Node, sets the next and prev to null.
 * @param {Object} value The value that the node should hold.
 */
function Node(value) {
  this.value = value;
  this.next = null;
  this.prev = null;
}

/**
 * Returns the value of the Node.
 * @returns {Object} value
 */
Node.prototype.getValue = function () {
  return this.value;
};

/**
 * Sets the value of the next elemnt for this node.
 * @param {Node} node - The node to be linked.
 * @returns {Boolean} true, if node was linked
 * @throws {TypeError} When node is not type of Node.
 */
Node.prototype.setNext = function (node) {
  if (!(node instanceof Node)) {
    throw new TypeError('Next element has to be an instance of Node');
  }
  this.next = node;
  return true;
};

/**
 * Returns the element linked to next.
 * @returns {Node} next
 */
Node.prototype.getNext = function () {
  return this.next;
};

/**
 * Checks if there is a next link.
 * @returns {Boolean} True if there is a next link, otherwise false.
 */
Node.prototype.hasNext = function () {
  return this.next !== null;
};

/**
 * Removes the next link.
 * @returns {Node} value Value the next link, if there was no link returns false.
 */
Node.prototype.removeNext = function () {
  const value = this.next;
  this.next = null;
  return value ? value : false;
};

/**
 * Sets the value of the prev elemnt for this node.
 * @param {Node} node - The node to be linked.
 * @returns {Boolean} true, if node was linked.
 * @throws {TypeError} When node is not type of Node.
 */
Node.prototype.setPrev = function (node) {
  if (!(node instanceof Node)) {
    throw new TypeError('Prev element has to be an instance of Node');
  }
  this.prev = node;
  return true;
};

/**
 * Returns the element linked to prev.
 * @returns {Node} prev
 */
Node.prototype.getPrev = function () {
  return this.prev;
};

/**
 * Checks if there is a prev link.
 * @returns {Boolean} True if there is a prev link, otherwise false.
 */
Node.prototype.hasPrev = function () {
  return this.prev !== null;
};

/**
 * Removes the prev link.
 * @returns {Node} value Value the prev link, if there was no link returns false.
 */
Node.prototype.removePrev = function () {
  const value = this.prev;
  this.prev = null;
  return value ? value : false;
};

module.exports = Node;
