describe('Array Operations', () => {
  test('Array length is as expected', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
  });

  test('Array contains specific values', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toContain('banana');
    expect(fruits).toContain('apple');
  });
});

describe('String Operations', () => {
  test('Concatenating two strings', () => {
    const greeting = 'Hello,';
    const name = 'John';
    const message = greeting + ' ' + name;
    expect(message).toBe('Hello, John');
  });

  test('String length is greater than 3', () => {
    const word = 'test';
    expect(word.length).toBeGreaterThan(3);
  });
});
