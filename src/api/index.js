const express = require('express');
const router = express.Router();

router.use(require('./healthcheck'));
router.use(require('./authorized'));

module.exports = router;