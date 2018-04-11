const userModel = require("../models/userModel");
var validator = require('validator');
const userController = {};
const bcryptjs = require("bcryptjs"); 

userController.verifyEncryptedCookie = (req, res) => {

}; 

userController.validateCreateUser = (req, res) => {
  let { username, password, email, phone } = req.body;
  let validCrendtials = {};
  validCrendtials.isValid = true;
  validCrendtials.messages = {};
  //
  if(validator.isEmail(email)) {
    res.locals.email = email;    
  }
  else {
    validCrendtials.isValid = false;
    validCrendtials.messages.email = "Bad email";
  }
  if(/^[A-Za-z0-9_.]+$/.test(username)){
    res.locals.username = username;
  }
  else {
    validCrendtials.isValid = false;
    validCrendtials.messages.username = "Valid username has only letter, numbers, underscore and dashes";
  }
  if(password.length > 1){
    res.locals.password = password;
  }
  else {
    validCrendtials.isValid = false;
    validCrendtials.messages.password = "password greater than 1 char";
  }
  if(phone.length > 1){
    res.locals.phone = phone;
  }
  else {
    validCrendtials.isValid = false;
    validCrendtials.messages.phone = "phone needs to be 10 digits";
  }
  return validCrendtials;
};

userController.createUser = (req, res, next) => {
  const validCrendtials = userController.validateCreateUser(req, res);
  console.log('validCrendtials: ', validCrendtials);
  if (validCrendtials.isValid) {
    const username = res.locals.username;
    const password = res.locals.password;
    const email = res.locals.email;
    const phone = res.locals.phone;
    // BCRYPT - ENCRYPTING PASSWORD
    bcryptjs.genSalt(10, (err, salt)=>{
        if(err){
            console.log("GENSALT ERROR:",err); 
            return; 
        }
        else{
            bcryptjs.hash(password, salt, (err, bcryptedPassword)=>{
                if(err){
                    console.log("ERROR INSIDE USERCONTROLLER:", err)
                }
                else{ 
                    let password = bcryptedPassword;
                    // DATABASE - SAVING NEW USER TO DB
                    userModel
                    .create({ username, password, email, phone })
                    .then((result) => {
                    res.locals.user = result;
                    res.json(result);
                    //next();
                    })
                    .catch((err) => {
                    //console.log(err);
                    //res.json(JSON.stringify(err));
                    res.json({ error: "validation" });
                    //next();
                    });
                }
            });
        }    
    }); 
  } 
  else {
    console.log('failed tests!!!');
    res.json(validCrendtials);
  }
};
// userController.readUser = (req, res, next) => {
//     const id = req.body.userID;
//     userModel.findOne({_id: id})
//     .then((result)=>{
//         console.log(result);
//         next();
//     })
//     .catch((err)=>{
//         console.log(err);
//         next();
//     });
// };
userController.updateUser = (req, res, next) => {
    // make object conditionally based on what fields are being updated
    userModel.update({_id: id}, {$set: {}})
    .then(

    )
    .catch(

    );
};
// userController.deleteUser = (req, res, next) => {
//     let id = req.body.id;
//     userModel.findByIdAndRemove(id)
//     .then()
//     .catch();
// };

module.exports = userController;
