const Script = require('./example.routes');

module.exports = (app) => {
  app.use('/', Script);
};
