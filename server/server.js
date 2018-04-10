

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
        res.json(JSON.stringify(err));
     }
);

// BODY PARSER
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTERS
const userRouter = require("./routers/userRouter"); 

// STATIC FILES 
app.use(express.static("./public")); 

// ROUTES
app.use("/api", userRouter); 

// START SERVER
app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT); 
});
