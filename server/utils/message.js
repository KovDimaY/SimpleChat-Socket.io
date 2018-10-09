const createMessage = (from, text, avatar, color) => {
  return {
    from,
    text,
    avatar,
    color,
    timestamp: new Date().getTime()
  };
};

const createLocation = (from, lat, lon, avatar, color) => {
  return {
    from,
    avatar,
    color,
    url: `https://www.google.es/maps?q=${lat},${lon}`,
    timestamp: new Date().getTime()
  };
};

module.exports = {
  createMessage,
  createLocation,
};
