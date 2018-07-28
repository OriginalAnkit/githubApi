const express = require("express");
const path = require('path');
const routes = require("./routes")
//variables
var app = express();
app.use("/user", routes);

app.use(express.static(path.join(__dirname, 'public')));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})


//port setup
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening at " + port)
});