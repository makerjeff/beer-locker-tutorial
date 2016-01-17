/**
 *SERVER.JS
 *Server for beer locker tutorial
 */

// package definitions
var colors = require('colors');             //console colors
var express = require('express');           //express server
var mongoose = require('mongoose');         //mongoDB interface
var bodyParser = require('body-parser');    //parses POST requests

// import custom beer.js module
var Beer = require('./models/beer');

// CONNECT MONGOOSE
mongoose.connect('mongodb://localhost:27017/beerlocker');

//create application
var app = express();

//port ####
var port = process.argv[2] || 8000;

//create router
var router = express.Router();  // better than standard Express router?

// == MIDDLEWARE ==
//register all our routes with /api
app.use('/api', router);

//use body parser
app.use(bodyParser.urlencoded({
    extended: true
}));


// == ROUTES ==
// initial dummy route for testing
//http://localhost:<port>/api
router.get('/', function(request, response) {
    response.json({ message: 'You are running dangerously low on beer!'});
});

// create new route with prefix /beers
var beersRoute = router.route('/beers');

// create POST endpoint /api/beers
beersRoute.post(function(request, response){
    //create new instance of beer model
    var beer = new Beer();

    //grab the beer properties that came from POST data
    beer.name = request.body.name;
    beer.type = request.body.type;
    beer.quantity = request.body.quantity;

    //save the beer and check for errors
    beer.save = function(err){
        if(err) {
            response.send(err);
        } else {
            response.json({message: 'Beer added to the locker!', data: beer });
        }
    }

});

// == START THE SERVER ==
app.listen(port);
console.log(colors.rainbow('Insert beer on port ' + port));
