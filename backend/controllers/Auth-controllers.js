const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//! user
const USERS_FETCHALL_GET = (req, res, next) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(next);
};

const USER_BYID_GET = (req, res, next) => {
  User.findById(req.params.uid)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(next);
};

//! login

const AUTH_LOGIN_POST = (req, res, next) => {
  let userFetched;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    // ! verify user & email
    .then((userFound) => {
      userFetched = userFound;
      if (userFetched) {
        const hashedpass = userFound.password;
        return bcrypt.compare(password, hashedpass);
      } else {
        return res.status(404).json({ message: "no user with this email" });
      }
    })
    //! compare
    .then((compareResult) => {
      if (compareResult) {
        //! token
        const token = jwt.sign(
          { email: userFetched.email, password: userFetched.password },
          "ioidzjdihzhih251",
          { expiresIn: "1h" }
        );
        console.log({
          userInfos: userFetched,
          token: token,
          expires: 3600,
        });
        res
          .status(200)
          .json({ userInfos: userFetched, token: token, expires: 3600 });
      } else {
        res.status(404).json({ message: "password not the same" });
      }
    })
    .catch(next);
};
// !signup
const AUTH_SIGNUP_POST = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 10)
    .then((hashepass) => {
      const user = new User({
        ...req.body,
        password: hashepass,
      });

      user
        .save()
        .then((data) => {
          res.status(200).json(data);
          console.log(data);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  USERS_FETCHALL_GET,
  USER_BYID_GET,

  AUTH_LOGIN_POST,
  AUTH_SIGNUP_POST,
};
