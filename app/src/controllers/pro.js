const proDao = require('../dao/pro');

exports.getTutorialAvailability = async (req, res) => {
  const { fromDate, toDate } = req.query;
  if (fromDate && toDate) {
    try {
      const result = await proDao.getTutorialAvailability(fromDate, toDate);
      res.status(200).send({ data: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};
