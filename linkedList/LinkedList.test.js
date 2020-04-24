const LinkedList = require('./LinkedList');

test('Make new linked list and test isEmpty', () => {
  const ll = new LinkedList();
  expect(ll).toEqual({ size: 0, head: null, tail: null });
  expect(ll.isEmpty()).toBeTruthy();
});

test('Add one elemnt to head.', () => {
  const ll = new LinkedList();
  expect(ll.addToHead(100)).toBeTruthy();
  expect(ll.getHead()).toBe(100);
  expect(ll.getTail()).toBe(100);
});

test('Add multiple elements to head.', () => {
  const ll = new LinkedList();
  expect(ll.addToHead(100)).toBeTruthy();
  expect(ll.getHead()).toBe(100);
  expect(ll.getTail()).toBe(100);
  expect(ll.addToHead(200)).toBeTruthy();
  expect(ll.getHead()).toBe(200);
  expect(ll.addToHead(300)).toBeTruthy();
  expect(ll.getHead()).toBe(300);
  expect(ll.getTail()).toBe(100);
});

test('Add and remove multiple elements to head.', () => {
  const ll = new LinkedList();
  ll.addToHead(100);
  ll.addToHead(200);
  ll.addToHead(300);
  expect(ll.getHead()).toBe(300);
  expect(ll.getTail()).toBe(100);
  expect(ll.removeHead()).toBe(300);
  ll.addToHead(400);
  ll.addToHead(500);
  expect(ll.getHead()).toBe(500);
  expect(ll.getTail()).toBe(100);
  expect(ll.removeHead()).toBe(500);
  expect(ll.removeHead()).toBe(400);
  expect(ll.removeHead()).toBe(200);
  expect(ll.removeHead()).toBe(100);
  expect(ll.isEmpty()).toBeTruthy();
});

test('Add one element to tail.', () => {
  const ll = new LinkedList();
  expect(ll.addToTail(100)).toBeTruthy();
  expect(ll.getHead()).toBe(100);
  expect(ll.getTail()).toBe(100);
});

test('Add multiple elements to tail.', () => {
  const ll = new LinkedList();
  expect(ll.addToTail(100)).toBeTruthy();
  expect(ll.addToTail(200)).toBeTruthy();
  expect(ll.addToTail(300)).toBeTruthy();
  expect(ll.addToTail(400)).toBeTruthy();
  expect(ll.getHead()).toBe(100);
  expect(ll.getTail()).toBe(400);
});

test('Add and remove multiple elements to tail.', () => {
  const ll = new LinkedList();
  ll.addToTail(100);
  ll.addToTail(200);
  ll.addToTail(300);
  expect(ll.removeTail()).toBe(300);
  ll.addToTail(400);
  ll.addToTail(500);
  expect(ll.getSize()).toBe(4);
  expect(ll.removeTail()).toBe(500);
  expect(ll.removeTail()).toBe(400);
  expect(ll.removeTail()).toBe(200);
  expect(ll.removeTail()).toBe(100);
  expect(ll.isEmpty()).toBeTruthy();
});

test('Adding to head and remove from tail.', () => {
  const ll = new LinkedList();
  ll.addToHead(100);
  expect(ll.removeTail()).toBe(100);
  expect(ll.isEmpty()).toBeTruthy();
});

test('Contains should return true for 100 and false for 50.', () => {
  const ll = new LinkedList();
  ll.addToHead(100);
  ll.addToHead(200);
  ll.addToHead(300);
  ll.addToHead(400);
  ll.addToTail(200);
  ll.addToTail(300);
  ll.addToTail(400);
  expect(ll.contains(100)).toBeTruthy(); // test with head as start.
  expect(ll.contains(100, 'tail')).toBeTruthy(); // test with tail as start.
  expect(ll.contains(50)).toBeFalsy();
});

test('Index of should return 5 for 100, index of 1000 should be -1', () => {
  const ll = new LinkedList();
  ll.addToHead(100);
  ll.addToHead(200);
  ll.addToHead(300);
  ll.addToHead(400);
  ll.addToHead(500);
  ll.addToHead(600);
  expect(ll.indexOf(100)).toBe(5);
  expect(ll.indexOf(1000)).toBe(-1);
});
