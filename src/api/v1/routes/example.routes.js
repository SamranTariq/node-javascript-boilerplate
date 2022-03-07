const express = require('express');
const router = express.Router();

const ExampleController = require('../controllers/example.controller');

router.get('/run', ExampleController.runExample);

module.exports = router;
