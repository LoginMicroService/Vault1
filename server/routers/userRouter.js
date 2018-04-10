const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const formValidationController = require("../controllers/formValidationController");

router.post("/user/create", 
    formValidationController.validateUserCreate,
    userController.userCreate, 
    (req, res) => {
        res.json(res.locals.user);
    });

router.post("/user/read", 
    userController.userRead, 
    (req, res) => {
        res.json(res.locals.user);
    });

router.post("/user/update", 
    userController.userUpdate, 
    (req, res) => {
        res.json(res.locals);
    });

router.post("/user/delete", 
    userController.userDelete, 
    (req, res) => {
        res.json(res.locals.user);
    });

module.exports = router;
