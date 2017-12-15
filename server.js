// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://tonz341:password341@ds137256.mlab.com:37256/tonz341', (err, database) => {
    if (err) return console.log(err)
    db = database
    console.log('database success');

    app = express();
    app.get('/test/test', (req, res) => {
        db.collection('quotes').save({test:'2' , message:'haha'}, (err, result) => {
            if (err) {
                return console.log(err)
            }
            console.log('saved to database')
          })
          res.redirect('/')
    })
    
    app.get('/api/chats/all', (req, res) => {
       db.collection('chats').find().limit(10).toArray(function(err, results) {
            res.json(results)
        })
    })
    
    app.use('/api/images', require('./src/api/images'))
    app.use(history());
    app.use(serveStatic(__dirname + "/dist"));
    
    var port = process.env.PORT || 80;
    var server = app.listen(port,function(){
        console.log('server started in the '+ port);
    });
    
    var io = require('socket.io').listen(server);
    io.on('connection',function (socket) { 
        socket.on('global-chat:send-server',function(message){ // listner from clients RECEIVER
            io.emit('global-chat:send-clients',message); // broadcastV SENDER
            db.collection('chats').save({user: 'anonymous' , message: message, datetime: null}, (err, result) => {})
        });
        
        socket.on('disconnect',function(){ // listner from clients when disconnects  // DEFAULT
            //  io.emit('test-channel:chat','User has been disconnected'); // broadcast
        });
    });
    
})













    