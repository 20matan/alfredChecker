var express = require('express')
  , router = express.Router();

router.get('/', (req, res) => {
  res.send({ans: 1});
})

module.exports = router;
