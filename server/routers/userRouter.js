const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const formValidationController = require("../controllers/formValidationController");

router.post("/user/create", 
    formValidationController.validateUserCreate,
    userController.createUser, 
    (req, res) => {
        res.json(res.locals.user);
    }
);

// router.post("/user/read", 
//     userController.readUser, 
//     (req, res) => {
//         res.json(res.locals.user);
//     }
// );

// router.post("/user/update", 
//     userController.updateUser, 
//     (req, res) => {
//         res.json(res.locals);
//     }
// );

// router.post("/user/delete", 
//     userController.deleteUser, 
//     (req, res) => {
//         res.json(res.locals.user);
//     }
// );

module.exports = router;
