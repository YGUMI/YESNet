var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dappsSchema = new Schema({
    
    owner_id: String,
    app_name: String,
    description: String,
    abi: String,
    bin: String,
    tx_hash: String,
    contract_address: String,
    deployed_time: Number,
    functions: [String]
    
    /*
    name: String,
    abi: String,
    bin: String,
    bin_runtime: String,
    tx_hash: String,
    contract_addr: String,
    deployed_time: Number
    */

});

module.exports = mongoose.model('dapps', dappsSchema);