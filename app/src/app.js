var createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const sequelize = require('./connectors/database');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const proRouter = require('./routes/pro');

const port = process.env.PORT || '6060';

const app = express();

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const whitelist = [
  'http://localhost:3000',
  'http://avoplan.s3-website.us-east-2.amazonaws.com',
  'http://lawyer-platform.s3-website.us-east-2.amazonaws.com'
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('*', cors(corsOptionsDelegate));
app.use('/', authRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/search', searchRouter);
app.use('/pro', proRouter);

// Log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send('Something went wrong');
});

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log(
        `Connection to database successful. Server is listening at port ${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
