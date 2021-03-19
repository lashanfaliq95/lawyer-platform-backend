const dao = require('../dao/search');
const utils = require('../utils/search');
const qs = require('qs');

exports.getFilters = async (req, res) => {
  try {
    const result = await dao.getSpecializationsFilters();
    const specializations = utils.separateSpecializations(result);

    const languages = await dao.getLanguagesFilters();
    if (specializations && languages) {
      res.status(200).send({
        specializations,
        languages,
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

exports.filterLawyers = async (req, res) => {
  try {
    const {
      availability,
      specializations,
      freeFirstAppointment,
      appointmentWithImmediateConfirmation,
      languages,
      nameOrFirm,
      location,
    } = qs.parse(req.query);

    const languageArray = utils.getIntArrayFromString(languages);
    const specializationsArray = utils.getIntArrayFromString(specializations);
    const result = await dao.getSearchResults({
      specializations: specializationsArray,
      languages: languageArray,
      nameOrFirm,
    });
    const updatedResult =
      result &&
      result.map((lawyer) => ({
        ...lawyer,
        specializationIds: lawyer.specializationIds
          ? lawyer.specializationIds.split(',').map((id) => parseInt(id))
          : null,
      }));
    res.status(200).send(updatedResult);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { nameOrFirm, location } = qs.parse(req.query);
    if (nameOrFirm) {
      const result = await dao.getNameOrFirmSuggestions(`%${nameOrFirm}%`);
      if (result && result.length > 0) {
        const updatedResult = [];
        for(let i=0;i<6;i++){
          updatedResult.push(result[i].name|| result[i].specilization)
        }
        res.status(200).send(updatedResult);
      } else {
        res.status(200).send([]);
      }
    } else if (location) {
      const response = await utils.getPlaces(location);
      if (response && response.data) {
        const updatedResponse = response.data.predictions.map(
          (suggestion) => suggestion.structured_formatting.main_text
        );
        res.status(200).send(updatedResponse);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.send(400).send({ message: 'Invalid parameters' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const { input } = qs.parse(req.query);
    if (input) {
      const response = await utils.getPlaces(input);
      res.status(200).send(response.data);
    } else {
      res.send(400).send({ message: 'Invalid parameters' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};
