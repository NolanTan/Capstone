describe('Math Operations', () => {
  test('Adding two numbers', () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });

  test('Multiplying two numbers', () => {
    const result = 4 * 5;
    expect(result).toBe(20);
  });
});

describe('String and Array Operations', () => {
  test('Checking if a string contains a specific word', () => {
    const sentence = 'pizza is cool!';
    expect(sentence).toContain('pizza');
  });

  test('Checking if an array contains a specific element', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toContain(3);
  });
});

describe('Truthiness and Falsiness Suite', () => {
  test('Testing the truthiness of a value', () => {
    const value = true;
    expect(value).toBeTruthy();
  });

  test('Testing the falsiness of a value', () => {
    const value = false;
    expect(value).toBeFalsy();
  });
});

describe('Object Operations Suite', () => {
  test('Checking if an object has a specific property', () => {
    const person = {
      name: 'John',
      age: 30,
      city: 'Example City',
    };
    expect(person).toHaveProperty('name');
  });
});
