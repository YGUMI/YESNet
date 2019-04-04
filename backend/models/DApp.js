var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DAppSchema = new Schema({
    
    email: String,
    address: String,
    developer: String,
    gas: String,
    ABI: String,
    bytecode: String,
    timestamp: Number
    
});

module.exports = mongoose.model('DApp', DAppSchema);