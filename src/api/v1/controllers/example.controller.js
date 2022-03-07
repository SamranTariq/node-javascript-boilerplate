const ExampleService = require('../services/example.service');

exports.runExample = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  try {
    await ExampleService.runService();
    return res.status(200).json({ status: 200, message: 'Example is running' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
