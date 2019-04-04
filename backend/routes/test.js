var express = require('express');
var router = express.Router();
var tests = require('../test.json');

router.get('/', function (req, res, next) {
  res.send(tests)
});

router.post('/', function (req, res, next) {

  const tmp = "0x8919182869b519568267104bd6929593102b0b47cfdddb070ccd80ceb607bf31"

  const hash_hex = tmp.substring(2, tmp.length);

  console.log("hash_hex: " + hash_hex);

  res.json(functions);
});

module.exports = router;