const express = require('express');
const { dialog } = require('../controller/webhookController');
const router = express.Router();

router.post('/', dialog)

module.exports = { webhookRoutes: router }
