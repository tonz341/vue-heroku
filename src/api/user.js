var express = require('express');
var request = require("request");
var router = express.Router();

router.get('/all', function(req, res) {
    const test = [
        {
            test: 1,
            piste: 3
        }
    ]
   res.json(test)
});

module.exports = router;