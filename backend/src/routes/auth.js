const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();
const jwt = require('jsonwebtoken');
let Account = require("../models/account");
const { JWT_SECRETE, emailRegex, passwordRegex } = require("../configs/database")
const { sendMail } = require("../utils/email")
console.log("ssssssssinside auth route")

// route for when user logs out, session is destroyed and user redirected to login
router.get("/logout", function (req, res) {
  req.session.destroy();
  return res.status(200).json({ success: true, message: "logout successfully"});
  //res.redirect("/login");
});

// route for when user views register page
router.get("/register", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("register", { message: undefined });
  }
});


router.post("/register", async function (req, res) {
  try {
    // const hash = await bcrypt.hash(req.body.password, 10) /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!req.body.email) return res.status(404).json({ success: false, message: "email required" });
    if (!(req.body.email.match(emailRegex))) return res.status(404).json({ success: false, message: "invalid emailId" });
    if (!req.body.password) return res.status(404).json({ success: false, message: "password required" });
    if (!(req.body.password.match(passwordRegex))) return res.status(404).json({ success: false, message: "invalid password,8 letter password, with at least a symbol, upper and lower case letters and a number" });
    const user = await Account.findOne({ email: req.body.email })
    if (user) return res.status(202).json({ success: false, message: "email already exist" });
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt)
    const encPassword = await bcrypt.hash(req.body.password, salt)
    console.log("encPassword ", encPassword)
    const doc = await Account.create({
      email: req.body.email,
      password: encPassword,
      otp: (Math.floor(100000 + Math.random() * 900000)),
      isActive: false
    })
    await sendMail({ OTP: doc.otp, to: doc.email, subject: "OTP For Login" }).catch((error) => {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong'
      })
    })
    req.login(doc.email, function (err, result) {
      if (err) return res.status(400).send("not able to set session");
      req.session.user = req.body.email
      return res.status(201).json({
        success: true,
        data: { email: doc.email, isActive: doc.isActive, Id: doc._id },
        Message: "User registation Successfully, please check otp sent on register email"
      })
    })

  } catch (error) {
    console.log("error", error)
    res.status(500).send("Something went wrong")
  }

});

// route for when user views login page
router.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("login", { message: undefined });
  }
});

// route for when user submits login details
router.post("/login", async function (req, res) {
  try {
    if (!req.body.email) return res.status(404).json({ success: false, message: "email required" });
    if (!req.body.password) return res.status(404).json({ success: false, message: "password required" });
    //if(!req.isAuthenticated()) return res.status(400).json({success:false,message:"session timeout"})
    req.body.email = req.body.email.toLowerCase();
    // req.body.password = req.body.password.toLowerCase();

    const doc = await Account.findOne({ email: req.body.email })
    if (doc) {
      if (!doc.isActive) return res.status(404).json({ success: false, message: 'user is not activated yet' })
      const isPasswordVerified = await bcrypt.compare(req.body.password, doc.password);
      if (isPasswordVerified) {
        const token = jwt.sign(
          { _id: doc._id, email: doc.email },
          JWT_SECRETE,
          {
            expiresIn: "1h",
          }
        )
        await Account.updateOne({ _id: doc._id }, { $set: { token: token } }, { new: true });
        req.login(doc.email, function (err, result) {
          if (err) return res.status(400).send("not able to set session");
          req.session.user = doc.email
          return res.status(200).json({ success: true, data: { token: token, userId: doc._id, email: doc.email } })
        })

      } else return res.status(404).json({ success: false, message: 'otp is wrong' })
    } else{
      return res.status(404).json({ success: false, message: "user not found" })
    }
   
  } catch (error) {
    console.log("eroorrrr", error)
    return res.status(500).send("something went wrong")
  }
});

// middleware which makes input lowercase and checks if it is valid.
function validateRegister() {
  return function (req, res, next) {
    // make input not case sensitive
    req.body.email = req.body.email.toLowerCase();
    //req.body.password = req.body.password.toLowerCase();
    console.log("req.body.email", validator.isEmail(req.body.email))
    //console.log("req.body.password", validator.isAlphanumeric(req.body.password))
    if (
      validator.isEmail(req.body.email)
      // validator.isAlphanumeric(req.body.password)
    ) {
      console.log("authentication = " + req.isAuthenticated());
      return next();
    }
    res.status(404).send("email and password should include aplhabates");
  };
}

module.exports = router;
