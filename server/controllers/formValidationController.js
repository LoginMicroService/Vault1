
var validator = require("validator");
const formValidationController = {};

// TODO: add a method to validate login form
// make validaton functions more dry since lots of reuses happens between both

formValidationController.validateUserCreate = (req, res, next) => {
    let { username, password, email, phone } = req.body;
    let validCrendtials = {};
    validCrendtials.isValid = true;
    validCrendtials.messages = {};
    //
    if (validator.isEmail(email)) {
      res.locals.email = email;
    } else {
      validCrendtials.isValid = false;
      validCrendtials.messages.email = "Bad email";
    }
    if (/^[A-Za-z0-9_.]+$/.test(username)) {
      res.locals.username = username;
    } else {
      validCrendtials.isValid = false;
      validCrendtials.messages.username =
        "Valid username has only letter, numbers, underscore and dashes";
    }
    if (password.length > 1) {
      res.locals.password = password;
    } else {
      validCrendtials.isValid = false;
      validCrendtials.messages.password = "password greater than 1 char";
    }
    if (phone.length > 1) {
      res.locals.phone = phone;
    } else {
      validCrendtials.isValid = false;
      validCrendtials.messages.phone = "phone needs to be 10 digits";
    }

    if(validCrendtials.isValid){
        res.locals.validCrendtials = validCrendtials;
        next()
    }
    else {
        res.json(validCrendtials)
    }
  };
  
  module.exports = formValidationController;