const { HashTable, HashNode } = require('./HashTable');

test('Should create two hashnodes, and set next on one of them.', () => {
  const n1 = new HashNode('Alex', '21');
  const n2 = new HashNode('Arcombe', '27');
  expect(n1).toEqual({ key: 'Alex', value: '21', next: null });
  n1.setNext(n2);
  expect(n1).toEqual({
    key: 'Alex',
    value: '21',
    next: { key: 'Arcombe', value: '27', next: null },
  });
});

test('Should fail to creata a node with undefined key then null as value.', () => {
  expect(() => new HashNode(undefined, '21')).toThrow(TypeError);
  expect(() => new HashNode('Alex', null)).toThrow(TypeError);
});

test('Should set the value to "Arcombe"', () => {
  const n1 = new HashNode('alex', 27);
  n1.setValue('Arcombe');
  expect(n1).toEqual({ key: 'alex', value: 'Arcombe', next: null });
});

test('Should not be able to set null as a value or next as a string.', () => {
  const n1 = new HashNode('Alex', '21');
  expect(() => n1.setValue(null)).toThrow(TypeError);
  expect(() => n1.setNext('Something')).toThrow(TypeError);
});

test('Should create a new hash tables.', () => {
  let expected = {
    buckets: Array.apply(null, new Array(16)),
    size: 0,
    loadingFactor: 0.75,
  };
  let actual = new HashTable();
  expect(actual).toEqual(expected);
  expected = {
    buckets: Array.apply(null, new Array(30)),
    size: 0,
    loadingFactor: 0.9,
  };
  actual = new HashTable(30, 0.9);
  expect(actual).toEqual(expected);
});

test('Should fail to create a hash table with capacity or loading factor as NaN.', () => {
  expect(() => new HashTable('five')).toThrow(TypeError);
  expect(() => new HashTable((loadingFactor = 'five'))).toThrow(TypeError);
});

test('Should get the correct hash, and should fail if not a string.', () => {
  const ht = new HashTable();
  const s = 'h3';
  const expected = (s.charCodeAt(0) + s.charCodeAt(1)) % ht.buckets.length;
  expect(ht.hashCode(s)).toBe(expected);
  expect(() => ht.hashCode(1)).toThrow(TypeError);
});

test('The size of the table should be 3 after the inserts.', () => {
  const ht = new HashTable();
  ht.insert('number', 31);
  ht.insert('object', { value: 313 });
  ht.insert('string', 'alex');
  expect(ht.getSize()).toBe(3);
});

test('Should return 100, "alex" and null when the table doesn\'t contain the key', () => {
  const ht = new HashTable();
  ht.insert('hundred', 100);
  ht.insert('number', 31);
  ht.insert('object', { value: 313 });
  ht.insert('string', 'alex');
  expect(ht.getValue('hundred')).toBe(100);
  expect(ht.getValue('string')).toBe('alex');
  expect(ht.getValue('not a key')).toBeNull();
});

test('Should have updated value to 200.', () => {
  const ht = new HashTable();
  ht.insert('hundred', 100);
  ht.insert('hundred', 200);
  expect(ht.getSize()).toBe(1);
  expect(ht.getValue('hundred')).toBe(200);
});

test('Should delete 10 and 20, should not be able to delete a key that is not there or not a string.', () => {
  const ht = new HashTable();
  ht.insert('hundred', 100);
  ht.insert('ten', 10);
  ht.insert('ent', 20);
  expect(() => ht.delete(10)).toThrow(TypeError);
  expect(ht.delete('a')).toBeNull();
  expect(ht.delete('net')).toBeNull();
  expect(ht.delete('ent')).toBe(20);
  expect(ht.delete('ten')).toBe(10);
  expect(ht.getValue('ten')).toBeNull();
});

test('Should retrive all values.', () => {
  const ht = new HashTable();
  ht.insert('1', 1);
  ht.insert('99', 2);
  ht.insert('3', 3);
  ht.insert('1111', 4);
  ht.insert('5', 5);
  ht.insert('111111', 6);
  ht.insert('7', 7);
  const expected = [1, 2, 3, 4, 5, 6, 7];
  expect(ht.retriveAll()).toEqual(expected);
});

test('Should double the capazity then reaching load factor.', () => {
  const ht = new HashTable(16, 0.15); // 16 * 0.1 = 2.4 so after 3 insert it sould double.
  ht.insert('"', 34); // " char code = 34
  ht.insert('1', 49); // 1 char code = 49
  expect(ht.getCapacity()).toBe(16);
  expect(ht.retriveAll()).toEqual([49, 34]);
  ht.insert('#', 35); // # char code = 35
  expect(ht.getCapacity()).toBe(32);
  expect(ht.retriveAll()).toEqual([34, 35, 49]);
});
