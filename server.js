/**
 *SERVER.JS
 *Server for beer locker tutorial
 */

// package definitions
var express = require('express');
var colors = require('colors');

//create application
var app = express();

//port ####
var port = process.argv[2] || 8000;

//create router
var router = express.Router();

// initial dummy route for testing
//http://localhost:<port>/api
router.get('/', function(request, response){
    response.json({ message: 'You are running dangerously low on beer!'});
});

//register all our routes with /api
app.use('/api', router);

//Start the 'serber'
app.listen(port);
console.log(colors.rainbow('Insert beer on port ' + port));
