const dao = require('../dao/search');
const utils = require('../utils/search');
const qs = require('qs');

exports.filterLawyers = async (req, res) => {
  const {
    availability,
    specializations,
    freeFirstAppointment,
    appointmentWithImmediateConfirmation,
    languages,
    nameOrFirm,
    location,
    page,
  } = qs.parse(req.query);

  const languageArray = utils.getIntArrayFromString(languages);
  const specializationsArray = utils.getIntArrayFromString(specializations);
  const result = await dao.getSearchResults({
    specializations: specializationsArray,
    languages: languageArray,
    nameOrFirm,
    page,
  });
  const updatedResult =
    result &&
    result.map((lawyer) => ({
      ...lawyer,
      specializationIds: lawyer.specializationIds
        ? lawyer.specializationIds.split(',').map((id) => parseInt(id))
        : null,
    }));
  return res.status(200).json(updatedResult);
};

exports.getSuggestions = async (req, res) => {
  const { nameOrFirm, location } = qs.parse(req.query);
  if (nameOrFirm) {
    const result = await dao.getNameOrFirmSuggestions(`%${nameOrFirm}%`);
    if (result && result.length > 0) {
      const updatedResult = [];
      for (let i = 0; i < 6; i++) {
        if (result[i]) {
          updatedResult.push(result[i].name || result[i].name);
        }
      }
      return res.status(200).json(updatedResult);
    }
    return res.status(200).json([]);
  } else if (location) {
    const response = await utils.getPlaces(location);
    if (response && response.data) {
      const updatedResponse = response.data.predictions.map(
        (suggestion) => suggestion.structured_formatting.main_text
      );
      return res.status(200).json(updatedResponse);
    }
    return res.status(200).json([]);
  }
  return res.json(400).json({ message: 'Invalid parameters' });
};

exports.getPlaces = async (req, res) => {
  const { input } = qs.parse(req.query);
  if (input) {
    const response = await utils.getPlaces(input);
    return res.status(200).json(response.data);
  }
  return res.json(400).json({ message: 'Invalid parameters' });
};
