const express= require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("./models/user");
const request = require("request");
const mongoose = require("mongoose");

// config
const router=express.Router();
router.use(bodyparser.json());
mongoose.connect("mongodb://server123:server123@ds145921.mlab.com:45921/gitapi");


// router.post("/",(req,res)=>{
//     res.send(jwt.verify(req.body.token,"server"));
// })


//===========register new User================
router.post("/register", (req, res) => {
    pass = req.body.password;
    //conditions on password
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(pass)) {
        res.json({
            error: "password must contain 1 Capital letter 1 small letter and 1 digit and must be greater than 6 characters"
        })
    } else {
        //creating hash of pass
        bcrypt.genSalt(11, (err, salt) => {
            if (!err) {
                bcrypt.hash(pass, salt, (err, hash) => {
                    if (err) {
                        res.json({
                            error: "Something went wrong"
                        })

                    } else {

                        // saving user
                        user.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        }, (e, u) => {
                            if (e) {
                                res.send(e);
                            } else {
                                res.send(u);
                            }
                        })
                    }
                })
            } else {
                res.json({
                    error: "Something went wrong"
                })
            }
        })
    }


});

//==================login==========================
router.post("/login", (req, res) => {
    user.findOne({
        email: req.body.email
    }, (err, user) => {
        console.log(user)
        if (err) {
            res.send({
                error: "something went wrong"
            });
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, (e, ans) => {
                if (ans) {
                    res.send(jwt.sign({
                        username:user.username,
                        _id:user._id
                    },"server"))
                } else {
                    res.send("wrong Password");
                }
            })
        } else {
            res.send({
                error: "No user Found"
            })
        }
    })
})

//================seaching===================
router.post("/search", (req, res) => {
    var options = {

        url: 'https://api.github.com/search/repositories?q=' +
            req.body.name +
            "+language:" + req.body.language +
            "+archived:" + req.body.archived +
            "&sort=" + req.body.sort +
            "&order=" + req.body.order,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, (e, r, body) => {
        if (e) {
            res.json({
                "error": "something went wrong!"
            })
        } else {
            res.json(body)
        }
    })
});



module.exports=router