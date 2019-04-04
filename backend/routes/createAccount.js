const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
    const date = new Date();
    const uid = req.body.uid + date.getTime() + "";
    const password = req.body.password;

    var parameters = {"password": password};

    var json = JSON.stringify({
        "uid": uid,
        "cmd": "createAccount",
        "parameters": parameters
    });

    req.cache.publish('orderChannel', json, redis.print);
    console.log("createAccount_publish");

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("createAccount_hexists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("createAccount_hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);
    
            res.send("" + result.result.accountAddr);
    
            req.cache.hdel("resChannel", uid, redis.print);
            console.log("createAccount_hdel");

            clearInterval(interval);
          });
        } else {
            console.log("loading");
        }

      });
    }, 500);

});

module.exports = router;