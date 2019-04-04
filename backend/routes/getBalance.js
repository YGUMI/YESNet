const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
    const date = new Date();
    const uid = req.body.uid + date.getTime() + "";
    const account = req.body.account;

    //var parameters = {"account": "0xa30da7e668d950c999a7877bd1feb0c1a6fcad22"};
    var parameters = {"account": account};

    var json = JSON.stringify({
        //"uid": "uid",
        "uid": uid,
        "cmd": "getBalance",
        "parameters": parameters
    });

    console.log("getBalance_publish");
    req.cache.publish('orderChannel', json, redis.print);

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("getBalance_hexists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("getBalance_hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);

            console.log(result);
            //응답에따라서 에러처리 해야함
    
            res.send("" + result.result.balance);
    
            console.log("getBalance_hdel");
            req.cache.hdel("resChannel", uid, redis.print);

            clearInterval(interval);
          });
        } else {
            console.log("loading");
        }

      });
    }, 500);

});

module.exports = router;