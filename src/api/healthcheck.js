const express = require('express');
const router = express.Router();

router.get('/healthcheck',
    (req, res, next) => {
        console.log('Lookin Good!');
        res.send('Healthy');
    }
);

module.exports = router;