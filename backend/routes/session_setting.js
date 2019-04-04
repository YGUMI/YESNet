const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
    Users.findOne({uid: req.body.uid}, (err, user) => {

        if(err) {
            console.log(err);
        }

        user.session_id = req.body.session_id;

        user.save(function(err) {
            if(err) {
                console.log(err);
            }
            res.json({result: 1});
        });
    })

    console.log("session_setting");
});

module.exports = router;