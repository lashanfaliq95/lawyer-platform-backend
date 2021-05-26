const proDao = require('../dao/pro');

exports.getTutorialAvailability = async (req, res) => {
  const { fromDate, toDate } = req.query;
  if (fromDate && toDate) {
    const result = await proDao.getTutorialAvailability(fromDate, toDate);
    return res.status(200).send({ data: result });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};
