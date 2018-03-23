const isValidName = (name) => {
  return typeof name === 'string' && name.trim().length > 0;
};

module.exports = { isValidName };
