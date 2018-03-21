const createMessage = (from, text) => {
  return {
    from, 
    text,
    timestamp: new Date().getTime()
  };
};

module.exports = {
  createMessage,
};