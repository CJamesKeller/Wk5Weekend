var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/info', function(req,res){

  res.send("info API get went");

});

router.get('/', function(req,res){
    res.sendFile(path.resolve('server/public/views/index.html'));
});

module.exports = router;
