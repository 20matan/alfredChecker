var express = require('express');
var app = express();
var http = require('http').Server(app);
// var io = require('socket.io')(http);
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var pollController = require('./app/controllers/polls');
// mongoose.connect('mongodb://localhost:27017/dbtest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var routes = require('./app/routes');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', routes);
// app.listen(port);
http.listen(port, () => {
  console.log("Listening on " + port);
})
console.log("MAGIC GONNA HAPPPEN");
