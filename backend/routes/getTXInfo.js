const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {

  const date = new Date();
  const uid = req.body.id + date.getTime() + "";

  var parameters = {
    //"txHash": "81d7b7dbcf2ea1f0185cd455e0320b8c7017c1cfa62f680de3240bd70a8d8d0f",
    "txHash": req.body.urlInput

  };

  var json = JSON.stringify({
      "uid": uid,
      "cmd": "getTx",
      "parameters": parameters
  });

    console.log("getTXInfo_publish");
    req.cache.publish('orderChannel', json, redis.print);

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("getTXInfo_hexists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("getTXInfo_hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);

            console.log(result);
    
            res.send(result.result.retValue);
    
            req.cache.hdel("resChannel", uid, redis.print);
            console.log("getTXInfo_hdel");

            clearInterval(interval);
          });
        } else {
            console.log("loading");
        }

      });
    }, 500);

});

module.exports = router;