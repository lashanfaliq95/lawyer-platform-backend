exports.timestampInComingHours = (hours = 0) => {
  const currentTimeStamp = new Date();
  currentTimeStamp.setHours(currentTimeStamp.getHours() + hours);
  return currentTimeStamp.getTime().toString();
};

exports.hasTimestampExpired = (createdAt) => {
  const currentTimeStamp = new Date();
  const expirationTime = new Date(createdAt);
  expirationTime.setHours(currentTimeStamp.getHours() + 1);

  if (expirationTime > currentTimeStamp) {
    return false;
  }
  return true;
};

exports.getMySqlDate = (date) => date.slice(0, 10);
