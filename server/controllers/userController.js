const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
//
const userModel = require("../models/userModel");
const userController = {};


userController.userCreate = (req, res, next) => {
  if (res.locals.validCrendtials.isValid) {
    const username = res.locals.username;
    const password = bcrypt.hashSync(res.locals.password, SALT_WORK_FACTOR);
    const email = res.locals.email;
    const phone = res.locals.phone;
    
    userModel
      .create({ username, password, email, phone })
      .then(result => {
        res.locals.user = result;
        next();
      })
      .catch(err => {
        res.json({ error: "failed database validation" });
      });
  } else {
    res.json(res.locals.validCrendtials);
  }
};

userController.userRead = (req, res, next) => {
  const id = req.body.userId;
  userModel
    .findOne({ _id: id })
    .then(result => {
      res.locals.user = result;
      next();
    })
    .catch(err => {
      res.json({ error: "database readUser" });
    });
};

userController.userUpdate = (req, res, next) => {
  // make object conditionally based on what fields are being updated
  let { userId, username, password, email, phone } = req.body;
  userModel
    .update({ _id: userId }, { $set: { username, password, email, phone } })
    .then(result => {
      // returns a update object
      res.locals = { update: "success" };
      next();
    })
    .catch(err => {
      res.json({ error: "database updateUser" });
    });
};

userController.userDelete = (req, res, next) => {
  let id = req.body.userId;
  userModel
    .findByIdAndRemove(id)
    .then(result => {
      res.locals.user = result;
      next();
    })
    .catch(err => {
      res.json({ error: "database deleteUser", err });
    });
};

module.exports = userController;
