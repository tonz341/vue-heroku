// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');
var bodyParser = require("body-parser");
var session = require('express-session')

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

    var chatSchema = mongoose.Schema({
      user: String,
      message: String,
      datetime: String
    });

    var Chat = mongoose.model('Chat', chatSchema); // database table
    app = express();

    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json())

    app.get('/api/chats/all', (req, res) => {
      Chat.find().sort({_id:-1}).limit(10).exec(function(err, results){
        res.json(results)
      })
    })
    
    app.get('/admin/login', () => {
        res.json({1: 'hehe'})
    })

    // auth here
    var userSchema = mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        lastname: String,
        firstname: String
    });

    var User = mongoose.model('User', userSchema); // database table

    app.post('/admin/login', (req, res) => {

        if(req.body.email && req.body.password){
            var email = req.body.email;
            var password = req.body.password;
        }
        User.findOne({email: email, password: password}).exec((err,result) => {
          if(result) {
            req.session.user = result
            req.session.save();
            res.json({
                user: result,
                code: 200,
                message: 'Success'
            })
          }
          else {
            res.json({
                user: null,
                code: 404,
                message: 'User not found'
            })
          }
        })
    })

    app.get('/admin/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })

    app.get('/admin/dashboard', (req, res) => {
        // res.end(req.params.id)
        if(!req.session.user) {
            res.redirect('/');
        }

        console.log(req.sessionID)
        console.log(req.session.user)
        res.json({ haha: 'secret'})
    })

    app.get('/authenticated/user', (req, res) => {
        res.json({
            user: req.session.user ? req.session.user : null,
            code: 200,
            message: 'Success'
        })
    })

    // end auth

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










    