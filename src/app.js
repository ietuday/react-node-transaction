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
const oneDay = 300000;
//const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(require('express-session')({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(cors())
/**
 * Wallet App 
 * 
 */
app.use('/', require('./routes/wallet'));
app.use('/', require('./routes/transaction'));



// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



// functions for persistant sessions
passport.serializeUser(function (user_id, done) { done(null, user_id); });
passport.deserializeUser(function (user_id, done) { done(null, user_id); });

app.listen(process.env.PORT || 5000, function () {
  console.log("listening on port 5000!");
});