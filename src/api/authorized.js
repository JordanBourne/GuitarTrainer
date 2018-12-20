const express = require('express');
const router = express.Router();

const authorization = require('./shared/jwtCheck');

router.get('/authorized',
    authorization,
    (req, res, next) => {
        console.log('Lookin Good!');
        res.send('Healthy');
    }
);

module.exports = router;