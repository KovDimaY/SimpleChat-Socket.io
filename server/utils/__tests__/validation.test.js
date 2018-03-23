const expect = require('expect');

const { isValidName } = require('../validation.js');

describe('isValidName', () => {
  it('should return true if a correct name is provided', () => {
    const input = 'test';
    const result = isValidName(input);

    expect(result).toBe(true);
  });

  it('should return false if an empty string is provided', () => {
    const input = '';
    const result = isValidName(input);

    expect(result).toBe(false);
  });

  it('should return false if only spaces are provided', () => {
    const input = '       ';
    const result = isValidName(input);

    expect(result).toBe(false);
  });

  it('should return false if a number is provided', () => {
    const input = 123;
    const result = isValidName(input);

    expect(result).toBe(false);
  });

  it('should return false if nothing is provided', () => {
    const result = isValidName();

    expect(result).toBe(false);
  });
});
