// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

app = express();
app.use(history());

app.use(serveStatic(__dirname + "/dist"));
var port = 81;
var server = app.listen(port,function(){
    console.log('server started in the '+ port);
});

var io = require('socket.io').listen(server);
io.on('connection',function (socket) { 
        socket.on('global-chat:send-server',function(message){ // listner from clients RECEIVER
           io.emit('global-chat:send-clients',message); // broadcastV SENDER
        });
        
        socket.on('disconnect',function(){ // listner from clients when disconnects  // DEFAULT
          //  io.emit('test-channel:chat','User has been disconnected'); // broadcast
        });
});
    