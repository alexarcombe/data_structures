const Node = require('./Node');

test('Create Nodes, with different values.', () => {
  expect(new Node(100)).toEqual({ value: 100, next: null, prev: null });
  expect(new Node('hello')).toEqual({ value: 'hello', next: null, prev: null });
  expect(new Node({})).toEqual({ value: {}, next: null, prev: null });
});

test('Should return 100.', () => {
  const n1 = new Node(100);
  expect(n1.getValue()).toBe(100);
});

test('Adding node to next.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(() => n1.setNext(1)).toThrow(
    'Next element has to be an instance of Node'
  );
  expect(n1.setNext(n2)).toBeTruthy();
  expect(n1.getNext()).toEqual(n2);
});

test('Check that hasNext works.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(n1.hasNext()).toBeFalsy();
  n1.setNext(n2);
  expect(n1.hasNext()).toBeTruthy();
  n1.removeNext();
  expect(n1.hasNext()).toBeFalsy();
});

test('Adding node to prev.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(() => n1.setPrev(1)).toThrow(
    'Prev element has to be an instance of Node'
  );
  expect(n1.setPrev(n2)).toBeTruthy();
  expect(n1.getPrev()).toEqual(n2);
});

test('Check that hasPrev works.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(n1.hasPrev()).toBeFalsy();
  n1.setPrev(n2);
  expect(n1.hasPrev()).toBeTruthy();
  n1.removePrev();
  expect(n1.hasPrev()).toBeFalsy();
});

test('Add a node to next and then remove it.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(n1.removeNext()).toBeFalsy();
  expect(n1.setNext(n2)).toBeTruthy();
  expect(n1.removeNext()).toEqual(n2);
  expect(n1.getNext()).toBeNull();
});

test('Add a node to prev and then remove it.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  expect(n1.removePrev()).toBeFalsy();
  expect(n1.setPrev(n2)).toBeTruthy();
  expect(n1.removePrev()).toEqual(n2);
  expect(n1.getPrev()).toBeNull();
});

test('Add one node to next and one node to prev, then remove it.', () => {
  const n1 = new Node(100);
  const n2 = new Node(200);
  const n3 = new Node(300);
  expect(n1.setPrev(n2)).toBeTruthy();
  expect(n1.setNext(n3)).toBeTruthy();
  expect(n1.getPrev()).toEqual(n2);
  expect(n1.getNext()).toEqual(n3);
  expect(n1.removePrev()).toBeTruthy();
  expect(n1.removeNext()).toBeTruthy();
  expect(n1.getPrev()).toBeNull();
  expect(n1.getNext()).toBeNull();
});
