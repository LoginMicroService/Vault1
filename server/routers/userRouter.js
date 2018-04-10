const express = require("express"); 
const request = require("request"); 
const router = express.Router(); 
const userController = require("../controllers/userController"); 

router.post("/user/create", userController.createUser, (req, res)=>{
    
});

router.post("/user/update", userController.updateUser, (req, res)=>{

});

router.post("/user/delete", userController.deleteUser, (req, res)=>{

});

router.post("/user/read", userController.readUser, (req, res)=>{

}); 

module.exports = router; 