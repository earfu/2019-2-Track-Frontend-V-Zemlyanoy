/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('words')).toBe(false)
  // ...
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1)).toBe('1 B')
  // ...
});

// другая группа проверок
test('Возвращает корректное значение', () => {
  expect(convertBytesToHuman(1207.0)).toBe('1.18 KB')
  // ...
});

test('Возвращает корректное значение', () => {
  expect(convertBytesToHuman(0)).toBe('0 B')
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman(1.1)).toBe(false)
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman(true)).toBe(false)
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman([])).toBe(false)
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman([1])).toBe(false)
  // ...
});

test('Возвращает false', () => {
  expect(convertBytesToHuman('1')).toBe(false)
  // ...
});
