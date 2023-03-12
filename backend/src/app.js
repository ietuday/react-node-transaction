// importing modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
const db = require("./configs/database");
const cors = require('cors');
const app = express();


// making the connection to mongo database
mongoose.connect(db.config.uri, db.config.options);

// setting the template engine to use ejs.
app.set("view engine", "ejs");

// middlewares for express routes
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const oneDay = 300000;
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(require('express-session')({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { secure: true } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(cors())
// express routes that exist
app.get('/', (req,res) => res.status(200).send("welcome to the todo app"));
/**
 * Wallet App
 * 
 */

app.use('/', require('./routes/wallet'));
app.use('/', require('./routes/transaction'));







// functions for persistant sessions
passport.serializeUser(function (user_id, done) { done(null, user_id); });
passport.deserializeUser(function (user_id, done) { done(null, user_id); });

app.listen(process.env.PORT || 5000, function () {
  console.log("listening on port 5000!");
});