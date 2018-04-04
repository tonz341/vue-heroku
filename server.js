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

    var noteSchema = mongoose.Schema({
        user_id: Number,
        category_id: String,
        label: String,
        description: String
    });

    var mapSchema = mongoose.Schema({
        formatted_address: String,
        lat: String,
        lng: String
    });
    
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
    var Chat = mongoose.model('Chat', chatSchema); // database table
    var Notes = mongoose.model('Notes', noteSchema); // database table
    var Maps = mongoose.model('Maps', mapSchema); // database table

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

    app.get('/admin/maps', (req, res) => {
        Maps.find().sort({_id:-1}).exec(function(err, results){
            res.json(results)
        })
    })

    app.post('/admin/maps/create', (req, res) => {
        var formatted_address = req.body.formatted_address;
        var lat = req.body.lat;
        var lng = req.body.lng;

        var maps = new Maps({
            formatted_address: formatted_address, 
            lat: lat,
            lng: lng
        });
        maps.save();

        res.json({ message: 'success', code: 200, maps: maps})
    })

    app.get('/admin/notes', (req, res) => {
        Notes.find().sort({_id:-1}).limit(5).exec(function(err, results){
            res.json(results)
        })
    })

    app.get('/admin/notes/autocomplete', (req, res) => {
        Notes.find().sort({_id:-1}).select('label category_id _id').exec(function(err, results){
            var set = results.map(function(item) {
                return {value: item['_id'], label: item['category_id'] +" - "+ item['label']};
            });
          res.json(set)
        })
    })

    app.get('/admin/migrate', (req, res) => {
        res.json('haha')
    })


    app.post('/admin/notes/create', (req, res) => {
        var category_id = req.body.category_id;
        var label = req.body.label;
        var description = req.body.description;

        var notes = new Notes({
            user_id: null , 
            category_id: category_id, 
            label: label.charAt(0).toUpperCase() + label.slice(1),
            description: description
        });
        notes.save();
        res.json({ message: 'success', code: 200, notes: notes})
    })

    app.patch('/admin/notes/update', (req, res) => {

        Notes.findById(req.body._id, function(err, query) {
            if (!query)
                res.json({ message: 'Document not found', code: 404 })
            else {
              // do your updates here
              query.description = req.body.description
              query.category_id = req.body.category_id
              query.label = req.body.label
          
              query.save(function(err) {
                if (err)
                    res.json({ message: 'error', code: 500 })
                else
                    res.json({ message: 'success', code: 200, notes: query})
              });
            }
        });
    })

    app.post('/admin/notes/delete', (req, res) => {
        Notes.remove({ _id: req.body.id }, function(err) {
            if (!err) {
                res.json({ message: 'success', code: 200 })
            }
            else {
                res.json({ message: 'error', code: 500 })
            }
        });
    })

    app.get('/admin/note/:id', (req, res) => {
        Notes.findById(req.params.id, function(err, query) { 
            if (!err) {
                res.json({ note: query, code: 200 })
            }
            else {
                res.json({ note: [],  code: 404 })
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










    