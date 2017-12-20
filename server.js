// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tonz341:password341@ds137256.mlab.com:37256/tonz341', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database success');

    var chatSchema = mongoose.Schema({
      user: String,
      message: String,
      datetime: String
    });

    var Chat = mongoose.model('Chat', chatSchema); // database table
    app = express();
  
    app.get('/api/chats/all', (req, res) => {
      Chat.find().sort({_id:-1}).limit(10).exec(function(err, results){
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
            var chats = new Chat({user: 'anonymous' , message: message, datetime: null});
            chats.save();
        });
      
        socket.on('disconnect',function(){ // listner from clients when disconnects  // DEFAULT
            //  io.emit('test-channel:chat','User has been disconnected'); // broadcast
        });
    });
});










    