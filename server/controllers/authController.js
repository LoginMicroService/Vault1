const userModel = require("../models/userModel");
//const userController = require("./userController"); 
const authController = {}; 

authController.sessionVerification = (req, res, next) => {
    let sessionId = req.cookies.sessionId; 
    // come back and fix this 
    userModel.findOne({"password":sessionId}, (err, result) => {
        console.log("authController:::::: ",result); 
        if(result){
            res.locals.isVerified = true;
            next(); 
            return; 
        }
        else{
            res.locals.isVerified = false; 
            next(); 
            return; 
        }
    }); 
}

module.exports = authController; 

