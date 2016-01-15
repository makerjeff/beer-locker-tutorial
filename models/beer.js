//BEER.JS
//mongoose model, broken out to a separate file,
//must import to SERVER.JS

//required mongoose module
var mongoose = require('mongoose');

//define beer schema
var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

//export mongoose model
module.exports = mongoose.model('Beer', BeerSchema);