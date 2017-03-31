const request = require('request');
var express = require('express')
  , router = express.Router();

const checkFlightsArray = (arrFlights) => {
  console.log("ARR_FLGITS", arrFlights);
  var isGood = true;
  arrFlights.forEach((objFlight) => {
    console.log("OBJFLIGHT", objFlight.flights);
    if (objFlight.flights[0].booking_info.status !== "CONFIRMED"){
      isGood = false
    }
  })

  return isGood;
}

router.get('/:pnr/:lastname', (req, res) => {
  const {pnr, lastname} = req.params;
  console.log("ONRRS", pnr, lastname);
  const options = {
    url: `https://api.sandbox.amadeus.com/v1.2/travel-record/${pnr}?last_name=${lastname}&apikey=j8GYYZ3bPY1SDG6udDhsQ7ZVqz6hBsDD`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (err, ans, response) => {
    var body = JSON.parse(response);
    // console.log("BODY", body, body.header, body["header"]);

    var isFlightGood = true;
    if (ans.statusCode == 200){
      // check if the user has flights which are not "CONFIRMED"
      const {flight_tickets, unticketed_flights} = body.reservation;
      if (flight_tickets.length > 0){
        isFlightGood = checkFlightsArray(flight_tickets);
      }
      // keep checking if it is still good
      if (isFlightGood && unticketed_flights.length > 0){
        isFlightGood = checkFlightsArray(unticketed_flights);
      }
      res.send({isFlightGood})
    }
    else{
      res.send({error: 'No flight data found for them params'})
    }
  })
  // res.send({ans: req.params.flightId});
})

module.exports = router;
