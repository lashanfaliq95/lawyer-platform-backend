const { User } = require('./app/src/models/index');

(async () => {
  return User.findAll();
})();
