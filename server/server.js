const path = require("path");
// USERCONTROLLER
const authController = require("./controllers/authController"); 
// EXPRESS
const express = require("express"); 
const PORT = process.env.PORT || "3333";
const app = express(); 

// MONGOOSE
const DBNAME = "vault1";
const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/${DBNAME}`)
.then(
    () => { 
       console.log('connected to database');
    },
    err => { 
        console.log(err); 
     }
);
// COOKIEPARSER
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
// BODY PARSER
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTERS
const userRouter = require("./routers/userRouter"); 

// STATIC FILES 
// bundle.js will be inside build folder
app.use(express.static("build")); 

// ROUTES
app.get("/", authController.sessionVerification, (req, res)=>{
    if(res.locals.isVerified){
        // send them their page html skeleton with bundle.js inside 
        res.cookie("sessionId", req.cookies.sessioinId, {httpOnly: true}); 
        res.sendFile(path.join(__dirname, "../client/verifiedUserPage.html")); 
    }
    else{
        // route user to signup login page
        res.sendFile(path.join(__dirname,"../client/signUpLogin.html")); 
    }
});
    // route for bundle.js

app.use("/api", userRouter); 

// START SERVER
app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT); 
});
