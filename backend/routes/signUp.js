const express = require('express');
const router = express.Router();
const users = require('../models/users');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    const User = new users();

    //console.log(req.body.data);

    User.uid = req.body.uid;
    User.passwd = req.body.passwd;
    User.accounts = req.body.accounts;
    User.eth_pass = req.body.eth_pass;
    User.name = req.body.name;
    User.email = req.body.email;
    User.session_id = "";

    User.save(function(err) {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        
        res.json({result: 1});
    });

/*
    const JSONdata = JSON.parse(req.body.data);

    User.uid = JSONdata.uid;
    User.passwd = JSONdata.passwd;
    User.accounts = JSONdata.accounts;
    User.eth_pass = JSONdata.eth_pass;
    User.name = JSONdata.name;
    User.email = JSONdata.email;
    User.session_id = "";

    User.save(function(err) {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        
        res.json({result: 1});
    });
*/
});

module.exports = router;