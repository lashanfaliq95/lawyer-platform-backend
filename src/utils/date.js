exports.timestampInComingHours = (hours = 0) => {
  const currentTimeStamp = new Date();
  currentTimeStamp.setHours(currentTimeStamp.getHours() + hours);
  return currentTimeStamp.getTime().toString();
};

exports.hasTimestampExpired = (expirationTimeStamp) => {
  const currentTimeStamp = new Date().getTime();
  if (parseInt(expirationTimeStamp) > currentTimeStamp) {
    return false;
  }
  return true;
};
