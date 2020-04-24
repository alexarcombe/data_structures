const Node = require('../node/Node');

/**
 * Creates a new empty linked list.
 */
function LinkedList() {
  this.size = 0;
  this.head = null;
  this.tail = null;
}

/**
 * Returns the size of the linked list.
 * @returns {number} size
 */
LinkedList.prototype.getSize = function () {
  return this.size;
};

/**
 * Returns true if the linked list is empty, otherwise false.
 * @returns {boolean} bool
 */
LinkedList.prototype.isEmpty = function () {
  return this.getSize() === 0;
};

/**
 * Adds the value to the head of the linked list.
 * @param {Object} value - The value to add.
 * @returns {boolean} true If the value was added to the head.
 * @throws {TypeError} When the value was undifined or null.
 */
LinkedList.prototype.addToHead = function (value) {
  if (value === undefined || value === null) {
    throw new TypeError('The value can not be undifined or null.');
  }
  const newNode = new Node(value);
  if (this.getSize() === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.setNext(this.head);
    this.head.setPrev(newNode);
    this.head = newNode;
  }
  this.size++;
  return true;
};

/**
 * Returns the value of head of the linked list if there is one.
 * @returns {Object} value of the head.
 * @throws {RangeError} The linked list is empty.
 */
LinkedList.prototype.getHead = function () {
  if (this.isEmpty()) {
    throw new RangeError('The linked list is empty.');
  }
  return this.head.getValue();
};

/**
 * Removes the head of the linked list if there is one, the value of the head is returned.
 * @returns {Object} value of the removed head.
 * @throws {RangeError} The linked list is empty.
 */
LinkedList.prototype.removeHead = function () {
  let node;
  if (this.isEmpty()) {
    throw new RangeError('The linked list is empty.');
  } else if (this.getSize() === 1) {
    // There is only one element left and the list should be set to empty.
    node = this.head;
    this.head = null;
    this.tail = null;
  } else {
    node = this.head;
    this.head = node.getNext();
    this.head.removePrev();
  }
  this.size--;
  return node.getValue();
};

/**
 * Adds the value to the tail of the linked list.
 * @param {Object} value - The value to add.
 * @returns {boolean} true If the value was added to the tail.
 * @throws {TypeError} When the value was undifined or null.
 */
LinkedList.prototype.addToTail = function (value) {
  if (value === undefined || value === null) {
    throw new TypeError('The value can not be undifined or null.');
  }
  const newNode = new Node(value);
  if (this.getSize() === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.setPrev(this.tail);
    this.tail.setNext(newNode);
    this.tail = newNode;
  }
  this.size++;
  return true;
};

/**
 * Returns the value of tail of the linked list if there is one.
 * @returns {Object} value of the tail.
 * @throws {RangeError} The linked list is empty.
 */
LinkedList.prototype.getTail = function () {
  if (this.isEmpty()) {
    throw new RangeError('The linked list is empty.');
  }
  return this.tail.getValue();
};

/**
 * Removes the tail of the linked list if there is one, the value of the tail is returned.
 * @returns {Object} value of the removed tail.
 * @throws {RangeError} The linked list is empty.
 */
LinkedList.prototype.removeTail = function () {
  let node;
  if (this.isEmpty()) {
    throw new RangeError('The linked list is empty.');
  } else if (this.getSize() === 1) {
    // There is only one element left and the list should be set to empty.
    node = this.tail;
    this.head = null;
    this.tail = null;
  } else {
    node = this.tail;
    this.tail = node.getPrev();
    this.head.removeNext();
  }
  this.size--;
  return node.getValue();
};

/**
 * Returns true if the linked list contains value, otherwise false.
 * @param {Object} value - The value to search for.
 * @param {string} [start=head] - Where the search should start from.
 * @returns {boolean} bool
 * @throws {TypeError} When the value was undifined or null.
 */
LinkedList.prototype.contains = function (value, start = 'head') {
  if (this.isEmpty()) {
    return false;
  }
  if (value === undefined || value === null) {
    throw new TypeError('Can not search for undefined or null.');
  }
  let current = start === 'head' ? this.head : this.tail;
  while (current !== null) {
    if (current.getValue() === value) {
      return true;
    }
    current = start === 'head' ? current.getNext() : current.getPrev();
  }
  return false;
};

/**
 * Returns index of first value found in the linked list, returns -1 if not present.
 * @param {Object} value - The value to search for.
 * @returns {number} index
 * @throws {TypeError} When the value was undifined or null.
 */
LinkedList.prototype.indexOf = function (value) {
  if (this.isEmpty()) {
    return -1;
  }
  if (value === undefined || value === null) {
    throw new TypeError('Can not search for undefined or null.');
  }
  let index = 0;
  let current = this.head;
  while (current !== null) {
    if (current.getValue() === value) {
      return index;
    }
    index++;
    current = current.getNext();
  }
  return -1;
};

module.exports = LinkedList;
