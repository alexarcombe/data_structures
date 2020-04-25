const BST = require('./BinarySearchTree');

test('Make an empty tree.', () => {
  const bst = new BST();
  expect(bst).toEqual({ size: 0, root: null });
});

test('Insert one element to tree', () => {
  const bst = new BST();
  expect(bst.insert(1)).toBeTruthy();
  expect(bst.getSize()).toBe(1);
  expect(bst).toEqual({ size: 1, root: { value: 1, next: null, prev: null } });
});

test('Insert duplicates', () => {
  const bst = new BST();
  expect(bst.insert(1)).toBeTruthy();
  expect(bst.insert(1)).toBeFalsy();
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

test('Should contain 15, 35 and not contain 40 or 1, can not contain NaN', () => {
  const bst = new BST();
  expect(bst.contains(1)).toBeFalsy();
  bst.insert(20);
  bst.insert(10);
  bst.insert(15);
  bst.insert(16);
  bst.insert(35);
  bst.insert(31);
  expect(bst.contains(15)).toBeTruthy();
  expect(bst.contains(35)).toBeTruthy();
  expect(bst.contains(40)).toBeFalsy();
  expect(bst.contains(1)).toBeFalsy();
  expect(() => bst.contains('false')).toThrow(TypeError);
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

test('Inorder dhould fill the list with 1,2,3,4', () => {
  const bst = new BST();
  const callback = (() => {
    let list = [];
    return (value) => {
      if (value) {
        list.push(value.getValue());
      }
      return list;
    };
  })();
  bst.insert(3);
  bst.insert(1);
  bst.insert(2);
  bst.insert(4);
  bst.depthFirstTraversal(callback, 'inorder');
  expect(callback()).toEqual([1, 2, 3, 4]);
});

test('Preorder should fill the list with 3,1,2,4', () => {
  const bst = new BST();
  const callback = (() => {
    let list = [];
    return (value) => {
      if (value) {
        list.push(value.getValue());
      }
      return list;
    };
  })();
  bst.insert(3);
  bst.insert(1);
  bst.insert(2);
  bst.insert(4);
  bst.depthFirstTraversal(callback, 'preorder');
  expect(callback()).toEqual([3, 1, 2, 4]);
});

test('Postorder should fill the list with 2,1,4,3', () => {
  const bst = new BST();
  const callback = (() => {
    let list = [];
    return (value) => {
      if (value) {
        list.push(value.getValue());
      }
      return list;
    };
  })();
  expect(bst.depthFirstTraversal(callback)).toBeFalsy();
  bst.insert(3);
  bst.insert(1);
  bst.insert(2);
  bst.insert(4);
  bst.depthFirstTraversal(callback, 'postorder');
  expect(callback()).toEqual([2, 1, 4, 3]);
});

test('Breadth first traversal should fill the list with 3,1,4,2', () => {
  const bst = new BST();
  const callback = (() => {
    let list = [];
    return (value) => {
      if (value) {
        list.push(value.getValue());
      }
      return list;
    };
  })();
  expect(bst.breadthFirstTraversal(callback)).toBeFalsy();
  bst.insert(3);
  bst.insert(1);
  bst.insert(2);
  bst.insert(4);
  bst.breadthFirstTraversal(callback);
  expect(callback()).toEqual([3, 1, 4, 2]);
});
