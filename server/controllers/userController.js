const SALT_WORK_FACTOR = 10;
const userModel = require("../models/userModel");
const userController = {};
const bcryptjs = require("bcryptjs"); 


userController.createUser = (req, res, next) => {
  if (res.locals.validCrendtials.isValid) {
    const username = res.locals.username;
    const password = res.locals.password;
    const email = res.locals.email;
    const phone = res.locals.phone;
    // BCRYPT - ENCRYPTING PASSWORD
    bcryptjs.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
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
// userController.updateUser = (req, res, next) => {
//     // make object conditionally based on what fields are being updated
//     userModel.update({_id: id}, {$set: {}})
//     .then(

//     )
//     .catch(

//     );
// };
// userController.deleteUser = (req, res, next) => {
//     let id = req.body.id;
//     userModel.findByIdAndRemove(id)
//     .then()
//     .catch();
// };

module.exports = userController;
