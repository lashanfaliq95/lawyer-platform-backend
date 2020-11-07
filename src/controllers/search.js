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
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};
