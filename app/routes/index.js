var express = require('express'),
    router = express.Router(),
    flight = require('./flight'),
    delayPredict = require('./delayPredict');
// polls = require('./polls');

// router.use('/polls', polls);
router.use('/flight', flight)
router.use('/predict', delayPredict)
router.get('/', (req, res) => {
    res.send({ a: 'zzxc' })
})
module.exports = router;
