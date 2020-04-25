/**
 * Constructor function for Hashtable.
 * @param {number} [capacity=16] - The length of the hastable.
 * @param {number} [loadingFactor=0.75] - The loading factor, when size > capacity * loading factor the capacity is doubled.
 * @throws {TypeError} The capacity and loading factor has to be a number.
 */
function HashTable(capacity = 16, loadingFactor = 0.75) {
  if (typeof capacity !== 'number' || typeof loadingFactor !== 'number') {
    throw new TypeError('Capacity and loading factor has to be a number.');
  }
  this.buckets = Array.apply(null, Array(capacity));
  this.size = 0;
  this.loadingFactor = loadingFactor;
}

/**
 * Returns the size of the hash table.
 * @returns {number} size
 */
HashTable.prototype.getSize = function () {
  return this.size;
};

/**
 * Returns the capacity of the hash table.
 * @returns {number} capacity
 */
HashTable.prototype.getCapacity = function () {
  return this.buckets.length;
};

/**
 * Insert a key-value pair in the hash table, if key already exists the value is updated.
 * @param {string} key
 * @param {Object} value
 * @returns {boolean} success
 */
HashTable.prototype.insert = function (key, value) {
  if (this.size + 1 > this.buckets.length * this.loadingFactor) {
    const copy = [...this.buckets];
    this.buckets = Array.apply(null, new Array(this.buckets.length * 2));
    addAll(copy, this);
  }
  const node = new HashNode(key, value);
  const hash = this.hashCode(key);
  if (this.buckets[hash] === undefined || this.buckets[hash] === null) {
    this.buckets[hash] = node;
  } else {
    let current = this.buckets[hash];
    let prev = null;
    do {
      if (current.key === key) {
        current.setValue(value);
        return true;
      }
      prev = current;
      current = current.next;
    } while (current);
    prev.next = node;
  }
  this.size++;
  return true;
};

/**
 * Helper function, used when doubling list.
 * @param {Array} items - List of the nodes to add.
 * @param {*} ht - The hash table to add them to.
 */
function addAll(items, ht) {
  let node;
  for (node of items) {
    while (node) {
      ht.insert(node.key, node.value);
      node = node.next;
    }
  }
}

/**
 * Returns the value that belongs to the key, if not in the key returns null.
 * @returns {Object} value
 */
HashTable.prototype.getValue = function (key) {
  const hash = this.hashCode(key);
  let current = this.buckets[hash];
  if (current === undefined) {
    return null;
  }
  while (current) {
    if (current.key === key) {
      return current.value;
    }
    current = current.next;
  }
  return current;
};

/**
 * Returns the value of the deleted key, otherwise null.
 * @param {string} key
 * @returns {Object} value
 * @throws {TypeError} When key is not of type string.
 */
HashTable.prototype.delete = function (key) {
  const hash = this.hashCode(key);
  let current = this.buckets[hash];
  if (current === undefined || current === null) {
    return null;
  } else if (current.key === key) {
    // If the key is the first in the bucket, next need to be linked.
    this.buckets[hash] = current.next;
    return current.value;
  }
  // Otherwise loop until we find the key.
  let prev = current;
  current = current.next;
  while (current) {
    if (current.key === key) {
      prev.next = current.next;
      return current.value;
    }
    current = current.next;
  }
  return null; // Didn't find the key, return null-
};

/**
 * Returns all the values in the table, if no values an empty list.
 * @returns {Array} values
 */
HashTable.prototype.retriveAll = function () {
  const items = [];
  let node;
  for (node of this.buckets) {
    while (node) {
      items.push(node.value);
      node = node.next;
    }
  }
  return items;
};

/**
 * Returns the hash code of the value.
 * @param {string} value - The value to hash
 * @returns {number} hash
 * @throws {TypeError} Only supports hash of strings.
 */
HashTable.prototype.hashCode = function (value) {
  if (typeof value !== 'string') {
    throw new TypeError('Only support hash of strings.');
  }
  return (
    value.split('').reduce((acc, current) => acc + current.charCodeAt(0), 0) %
    this.buckets.length
  );
};

/**
 * A node storing key-value pairs and a next value.
 * @param {string} key
 * @param {Object} value
 * @throws {TypeError}
 */
function HashNode(key, value) {
  if (typeof key !== 'string') {
    throw new TypeError('Key needs to be of the type string.');
  }
  if (value === undefined || value === null) {
    throw new TypeError('Value can not be undifined or null.');
  }
  this.key = key;
  this.value = value;
  this.next = null;
}

/**
 * Sets the next value of the node.
 * @param {Node} next - A node value or null.
 */
HashNode.prototype.setNext = function (next) {
  if (next instanceof HashNode || next === null) {
    this.next = next;
  } else {
    throw new TypeError('The value has to be a hashnode or null.');
  }
};

/**
 * Sets the value of the node.
 */
HashNode.prototype.setValue = function (value) {
  if (value === null || value === undefined) {
    throw new TypeError("Hashnode doesn't allow undifined or null values.");
  }
  this.value = value;
};

module.exports = { HashNode, HashTable };
