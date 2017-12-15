/* eslint-disable no-new */
var express = require('express');
var request = require("request");
var router = express.Router();
var app = express();

router.get('/all', function(req, res) {
    request.get('https://jsonplaceholder.typicode.com/photos?albumId=1',function(err,response,body){
        if(err) { res.send(err) }
        if(res.statusCode !== 200 ) { res.send(err) }
        res.send(body)
    });
});

module.exports = router;