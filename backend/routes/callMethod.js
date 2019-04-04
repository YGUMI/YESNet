const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/', function(req, res, next) {
});

router.post('/', function (req, res, next) {
/*
    const abi = JSON.stringify([
      {
        "constant": false,
        "inputs": [
          {
            "name": "_greeting",
            "type": "string"
          }
        ],
        "name": "setGreeting",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "greet",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "greeting",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ]);

    var parameters = {
      "account": "0xa30da7e668d950c999a7877bd1feb0c1a6fcad22",
      "passwd": "yesnet36%",
      "hash_hex": "81d7b7dbcf2ea1f0185cd455e0320b8c7017c1cfa62f680de3240bd70a8d8d0f",
      "functionName": "greeting",
      "abi": abi
    };
*/
/*
uid: uid,
account: account,
passwd: passwd,
hash_hex: hash_hex,
abi: abi,
functionName: functionName
*/
    const date = new Date();
    const uid = req.body.uid + date.getTime() + "";
    const account = req.body.account;
    const passwd = req.body.passwd;

    //여기서 헥사값을 의미하는 0x를 빼주어야 한다
    const hash_hex = req.body.hash_hex.substring(2, req.body.hash_hex.length);
    const abi = req.body.abi;
    const functionName = req.body.functionName;

    var parameters = {
      "account": account,
      "passwd": passwd,
      "hash_hex": hash_hex,
      "functionName": functionName,
      "abi": abi
    };

    var json = JSON.stringify({
        "uid": uid,
        "cmd": "callMethod",
        "parameters": parameters
    });

    req.cache.publish('orderChannel', json, redis.print);

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("exists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);

            console.log(result);
    
            res.send("" + result.result.retValue);
    
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