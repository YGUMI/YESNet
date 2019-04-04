const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
    
  const date = new Date();
  const uid = req.body.uid + date.getTime() + "";
  const account = req.body.account;

  //{'cmd': 'fillEth', 'uid': 'id-currentTime', 'parameters': {'to': '0xebd6639e8d033407e693CBc4D6e0897f58164ea3'}}

    //var parameters = {"to": "0xa30da7e668d950c999a7877bd1feb0c1a6fcad22"};
    //var parameters = {"to": "0xebd6639e8d033407e693CBc4D6e0897f58164ea3"};

    var parameters = {"to": account};

    var json = JSON.stringify({
        "uid": uid,
        "cmd": "fillEth",
        "parameters": parameters
    });

    req.cache.publish('orderChannel', json, redis.print);
    console.log("fillEth_publish");

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("fillEth_hexists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("fillEth_hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);

            console.log(result);
    
            res.send("" + result.result.txAddr);
    
            req.cache.hdel("resChannel", uid, redis.print);
            console.log("fillEth_hdel");

            clearInterval(interval);
          });
        } else {
            console.log("loading");
        }

      });
    }, 500);

});

module.exports = router;