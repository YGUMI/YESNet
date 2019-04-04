const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
    Users.findOne({session_id: req.body.session_id}, (err, user) => {

        if(err) {
            console.log(err);
        }

        res.json(user);
    })

    console.log("session_getUserInfo");
});

module.exports = router;