//Basic index route
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req,res){
    res.sendFile(path.resolve('server/public/views/index.html'));
});

module.exports = router;
