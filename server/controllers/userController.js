const userModel = require("../models/userModel");

const userController = {};
userController.createUser = (req, res, next) => {
    let {username, password, email, phone} = req.body;
    userModel.create({username, password, email, phone})
    .then((result) => {
        res.locals.userResult = result; 
        next(); 
    })
    .catch((err)=>{
        console.log(err); 
        next();
    }); 
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