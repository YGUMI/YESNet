const express = require('express');
const router = express.Router();
const DApp = require('../models/DApp');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
    DApp.find({}, function(err, results) {

        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        
        console.log("readDApps")
        res.send(results);
    });

});

module.exports = router;