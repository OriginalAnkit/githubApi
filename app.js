const express = require("express");

const routes=require("./routes.js")
//variables
var app = express();
app.use("/user",routes);







//port setup
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening at " + port)
});