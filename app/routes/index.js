var express = require('express'),
    router = express.Router(),
    flight = require('./flight');

const OneSignalClient = require('node-onesignal');
const client = new OneSignalClient(
"66411bd6-cc1b-4d4f-852f-505456b7b4f9",
"ZWRjNWE3ODgtZjVlMS00ODEyLThhYjMtNWZjOGEyMGU5MDM5");

    // polls = require('./polls');

// router.use('/polls', polls);
router.use('/flight', flight)
router.post('/user/', (req, res) => {
  console.log("AFKAFKFKA");
  client.sendNotification(req.body.message, {
    include_player_ids: ['6c087db7-7f04-4873-8d27-377f159b2793'],
    small_icon: 'applogo',
    large_icon: 'applogo'
  })
  .then((a) => {
    res.send({succeed: true})
  })
  .catch((e) => {
    console.log("EEE", e);
    res.send({succeed: false})
  })
})
router.get('/', (req, res) => {
  res.send({a: 'zzxc'})
})
module.exports = router;
