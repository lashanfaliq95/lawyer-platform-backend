const axios = require('axios');
var removeDiacritics = require('diacritics').remove;

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

exports.separateSpecializations = (specializations) => {
  if (!specializations || specializations.length === 0) {
    return null;
  }
  const lawSpecializations = [];
  const notarySpecializations = [];
  specializations.forEach((specialization) => {
    if (specialization.type === 1) {
      lawSpecializations.push(specialization);
    }
    if (specialization.type === 2) {
      notarySpecializations.push(specialization);
    }
  });

  return { lawSpecializations, notarySpecializations };
};

exports.getIntArrayFromString = (string) => {
  if (!string) {
    return null;
  }
  const stringArray = string.split(',');
  return stringArray.map((element) => parseInt(element));
};

exports.getPlaces = async (location) => {
  return await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${removeDiacritics(location)}&key=${process.env.PLACES_API_KEY}&components=country:de`
  );
};
