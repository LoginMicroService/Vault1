const express = require("express"); 
const userRouter = require("./routers/userRouter"); 
const bodyParser = require("body-parser"); 
const port = 3000;

// connecting db
mongoose.connect("mongodb://localhost/vault1")
.then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    err => { /** handle initial connection error */ }
);

const app = express(); 
// public 
app.use(express.static("./public")); 
// routers
app.use("/api", userRouter); 

app.listen(port, ()=>{
    console.log("Server running on port: ", port); 
});
