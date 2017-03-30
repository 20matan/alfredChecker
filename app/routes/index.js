var express = require('express'),
    router = express.Router(),
    flight = require('./flight');
    // polls = require('./polls');

// router.use('/polls', polls);
router.use('/flight', flight)
router.get('/', (req, res) => {
  res.send({a: 'zzxc'})
})
module.exports = router;
