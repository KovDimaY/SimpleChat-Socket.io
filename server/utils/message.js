const createMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: new Date().getTime()
  };
};

const createLocation = (from, lat, lon) => {
  return {
    from,
    url: `https://www.google.es/maps?q=${lat},${lon}`,
    timestamp: new Date().getTime()
  };
};

module.exports = {
  createMessage,
  createLocation,
};
