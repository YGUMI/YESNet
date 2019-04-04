const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {

    //실패 시 아래 post에서 이쪽으로 GET요청을 보낸다
    res.json({result: 0});
});

router.post('/', passport.authenticate('local', {

    //successRedirect : '/Main/MyPage',
    failureRedirect : '/api/login',

}), (req, res) => {
    
    //성공 시 이쪽
    res.json({result: 1});
});

module.exports = router;