const expect = require('expect');

const { createMessage, createLocation } = require('../message.js');

describe('createMessage', () => {
  it('should generate correct message object', () => {
    const input = {
      from: "Name",
      text: "Some text"
    };

    const result = createMessage(input.from, input.text);

    expect(result.from).toBe(input.from);
    expect(result.text).toBe(input.text);
    expect(typeof result.timestamp).toBe('number');
  });
});

describe('createLocation', () => {
  it('should generate correct location object', () => {
    const input = {
      from: "Name",
      lat: 123,
      lon: 456
    };
    const expectedUrl = 'https://www.google.es/maps?q=123,456'

    const result = createLocation(input.from, input.lat, input.lon);

    expect(result.from).toBe(input.from);
    expect(result.url).toBe(expectedUrl);
    expect(typeof result.timestamp).toBe('number');
  });
});
