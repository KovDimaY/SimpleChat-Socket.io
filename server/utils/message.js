const createMessage = (from, text, avatar) => {
  return {
    from,
    text,
    avatar,
    timestamp: new Date().getTime()
  };
};

const createLocation = (from, lat, lon, avatar) => {
  return {
    from,
    avatar,
    url: `https://www.google.es/maps?q=${lat},${lon}`,
    timestamp: new Date().getTime()
  };
};

module.exports = {
  createMessage,
  createLocation,
};
