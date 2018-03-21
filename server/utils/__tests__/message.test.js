const expect = require('expect');

const { createMessage } = require('../message.js');

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