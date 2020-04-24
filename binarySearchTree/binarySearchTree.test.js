const BST = require('./BinarySearchTree');

test('Make an empty tree.', () => {
  const bst = new BST();
  expect(bst).toEqual({ size: 0, root: null });
});

test('Insert one element to tree.', () => {
  const bst = new BST();
  expect(bst.insert(1)).toBeTruthy();
  expect(bst.getSize()).toBe(1);
  expect(bst).toEqual({ size: 1, root: { value: 1, next: null, prev: null } });
});

test('Insert three elements.', () => {
  const bst = new BST();
  expect(bst.insert(2)).toBeTruthy();
  expect(bst.insert(1)).toBeTruthy();
  expect(bst.insert(3)).toBeTruthy();
  expect(bst.getSize()).toBe(3);
  expect(bst).toEqual({
    size: 3,
    root: {
      value: 2,
      next: { value: 3, next: null, prev: null },
      prev: { value: 1, next: null, prev: null },
    },
  });
});

test('Insert a string.', () => {
  const bst = new BST();
  expect(() => bst.insert('hello')).toThrow('BST only supporst numbers atm.');
});

test('Should contain 15 and not contain 30', () => {
  const bst = new BST();
  bst.insert(20);
  bst.insert(10);
  bst.insert(15);
  bst.insert(16);
  bst.insert(35);
  bst.insert(31);
  expect(bst.contains(15)).toBeTruthy();
  expect(bst.contains(30)).toBeFalsy();
});

test('Should return the min value 1', () => {
  const bst = new BST();
  bst.insert(20);
  bst.insert(5);
  bst.insert(1);
  bst.insert(2);
  bst.insert(3);
  bst.insert(4);
  bst.insert(6);
  bst.insert(30);
  bst.insert(25);
  bst.insert(35);
  bst.insert(34);
  expect(bst.getMin()).toBe(1);
});

test('Should return the max value 35', () => {
  const bst = new BST();
  bst.insert(20);
  bst.insert(5);
  bst.insert(1);
  bst.insert(2);
  bst.insert(3);
  bst.insert(4);
  bst.insert(6);
  bst.insert(30);
  bst.insert(25);
  bst.insert(35);
  bst.insert(34);
  expect(bst.getMax()).toBe(35);
});
