const express = require("express"); 
const PORT = process.env.PORT || "3333";
const app = express(); 



const userRouter = require("./routers/userRouter"); 
const bodyParser = require("body-parser"); 

// BODY PARSER - Configure
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGOOSE
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vault1")
.then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    err => { 
        res.json(JSON.stringify(err));
     }
);


// public 
app.use(express.static("./public")); 
// routers
app.use("/api", userRouter); 

app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT); 
});
