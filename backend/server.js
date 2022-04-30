const express = require('express')
const mongojs = require('mongojs')
var app=express();
const session = require('express-session');
var sess = require('sess')
var path = require('path');
var cors = require("cors")
var bodyparser=require("body-parser");
var request = require("request")
var async = require("async")
var alert = require('alert')
var cookieParser=require('cookie-parser');
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser());
app.set("view engine","ejs"); // setting view engine to ejs

var cs="mongodb://vaishnavidasika:vaishnavi243@cluster0-shard-00-00.s7cds.mongodb.net:27017,cluster0-shard-00-01.s7cds.mongodb.net:27017,cluster0-shard-00-02.s7cds.mongodb.net:27017/hexatask1?ssl=true&replicaSet=atlas-mrsppr-shard-0&authSource=admin&retryWrites=true&w=majority"
var db=mongojs(cs,["users"])

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
      key: "user_sid", // cookies id 
      secret: "ssshhhhh",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 1000 * 6000 * 6000 * 1000000, // cookie expiration time in seconds
      },
    })
);
var sess;

app.post("/signup", (req,res) => {
    var d = {
        username : req.body.username
    }
    db.users.find(d, function(err,docs){
        if(docs.length !== 0){
            res.send('already registered')
        }
        else{
            var e = {
                username : req.body.username,
                walletname : req.body.email,
                walletid : req.body.wallet,
                password : req.body.password,
                profile: req.body.profile
            }
            db.users.insert(e,function(err,docs){
                if(err){
                    res.send("sorry")
                }else{
                    res.send('successfully registered')
                }
            })
        }
    })
})

app.post('/login', (req,res) => {
    sess = req.session
    var e = {
        walletname: req.body.username,
        walletid: req.body.wallet,
        password: req.body.password
    }
    sess.walletname = req.body.username
    sess.walletid = req.body.wallet
    sess.password = req.body.password
    db.users.find(e,(err,docs) => {
        if(docs.length==0){
            res.send("something went wrong")
        }else{
            res.render("index",{data:docs})
        }
    })
})

app.get('/update', (req,res) => {
    sess = req.session
    var b = {
        walletname:sess.walletname
    }
    db.users.find(b,(err,docs) => {
        res.render('profile',{data:docs})
    })
})

app.post('/profile', (req,res) => {
    sess = req.session
    db.users.find({},(err,docs) => {
        var b = {
            walletname:sess.walletname,
            walletid:sess.walletid
        }
        var data = {$set: 
            {
            username:req.body.username,
            walletname:req.body.walletname,
            walletid:req.body.walletid,
            password:req.body.password
            }
        }
        db.users.update(b,data)
        res.send("profile updated successfully")
    })
})

app.get('/delete', (req,res) => {
    sess = req.session
    var b = {
        walletname:sess.walletname
    }
    db.users.remove(b)
    console.log('deleted')
})

app.get('/logout', (req,res) => {
    res.send('successfully logged out')
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));