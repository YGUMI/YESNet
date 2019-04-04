const express = require('express');
const router = express.Router();
const redis = require('redis');
const DApp = require('../models/dapps');

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
*/
    //const bin = "608060405234801561001057600080fd5b506040805190810160405280600581526020017f48656c6c6f0000000000000000000000000000000000000000000000000000008152506000908051906020019061005c929190610062565b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b610410806101166000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a41368621461005c578063cfae3217146100c5578063ef690cc014610155575b600080fd5b34801561006857600080fd5b506100c3600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506101e5565b005b3480156100d157600080fd5b506100da6101ff565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011a5780820151818401526020810190506100ff565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016157600080fd5b5061016a6102a1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101aa57808201518184015260208101905061018f565b50505050905090810190601f1680156101d75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600090805190602001906101fb92919061033f565b5050565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102975780601f1061026c57610100808354040283529160200191610297565b820191906000526020600020905b81548152906001019060200180831161027a57829003601f168201915b5050505050905090565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103375780601f1061030c57610100808354040283529160200191610337565b820191906000526020600020905b81548152906001019060200180831161031a57829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061038057805160ff19168380011785556103ae565b828001600101855582156103ae579182015b828111156103ad578251825591602001919060010190610392565b5b5090506103bb91906103bf565b5090565b6103e191905b808211156103dd5760008160009055506001016103c5565b5090565b905600a165627a7a7230582023e221760f10d2a6ca8c3efc216d61879e1e47e45a041b15d684884e6fb346e90029";

    const owner_id = req.body.owner_id;
    const app_name = req.body.app_name;
    const description = req.body.description;
    const abi = req.body.abi;
    const bin = req.body.bin;

    const date = new Date();
    const uid = req.body.uid + date.getTime() + "";
    const account = req.body.account;
    const passwd = req.body.passwd;

    //"account": "0xa30da7e668d950c999a7877bd1feb0c1a6fcad22",
    //"passwd": "yesnet36%",
    var parameters = {
    "account": account,
    "passwd": passwd,
    "app_name": app_name,
    "abi": abi,
    "bin": bin
    };

    var json = JSON.stringify({
        "uid": uid,
        "cmd": "deployDApp",
        "parameters": parameters
    });

    console.log("requestDeploy_publish");
    req.cache.publish('orderChannel', json, redis.print);

    //1초마다 레디스db에 값이 있는지 확인하고 있다면, 값을 프론트엔드에 넘겨준다.
    //그리고 읽은 값을 지우고, 이 interval도 삭제한다.
    var interval = setInterval(function() {
      req.cache.hexists("resChannel", uid, function(err, exists) {
        console.log("requestDeploy_hexists: " + exists);

        if(exists) {
          req.cache.hget("resChannel", uid, function(err, obj) {
            console.log("requestDeploy_hget");
            if(err) {
                console.log(err);
            }
    
            const result = JSON.parse(obj);

            console.log(result.result.code);
            console.log(result);

            if(result.result.code == 200) {

                const tx_hash = result.result.tx_hash;
                const contract_address = result.result.contract_address;
        
                console.log("requestDeploy_hdel");
                req.cache.hdel("resChannel", uid, redis.print);

                console.log("requestDeploy_clearInterval");
                clearInterval(interval);

                const D_App = new DApp();

                D_App.owner_id = owner_id;
                D_App.app_name = app_name;
                D_App.description = description;
                D_App.abi = abi;
                D_App.bin = bin;
                D_App.tx_hash = tx_hash;
                D_App.contract_address = contract_address;

                const dateObject = new Date();
                const timestamp = dateObject.getTime();
                D_App.deployed_time = timestamp;

                const parsedAbi = JSON.parse(abi);
                var functions = new Array();
                for(var i = 0; i < parsedAbi.length; i++) {

                    if(parsedAbi[i].name != null) {
                    
                        functions.push(parsedAbi[i].name)
                    }
                }

                D_App.functions = functions;

                D_App.save(function(err) {
                    if(err) {
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    
                    console.log("requestDeploy_dbSave");
                    res.json({result: 1});
                });

            } else { // 500 등등 코어측 에러 출력
                
                res.json({result: 0});
            }

          });
        } else {
            console.log("loading");
        }

      });
    }, 1000);

});

module.exports = router;