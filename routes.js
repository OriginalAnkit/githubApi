const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("./models/user");
const request = require("request");
const mongoose = require("mongoose");
const cors = require("cors");
//var
const secret = "server";
var userId=null;
// config
const router = express.Router();
router.use(bodyparser.json());
mongoose.connect("mongodb://server123:server123@ds145921.mlab.com:45921/gitapi");
// mongoose.connect("mongodb://localhost:27017/gitapi");
router.use(cors());


//middleware
var auth = (req, res, next) => {
    try {
        // console.log(req.get('s-auth'))
        var u = jwt.verify(req.get('s-auth'), secret);
        // this.userId=u.token;
        // console.log(u._id);
        userId=u._id;

        user.findById(u.token, (e, usr) => {
            if (e) {
                res.send({
                    error: "unauthorized"
                });
            } else {
                next();
            }
        })
    } catch (e) {
        res.send({
            error: "unauthorizrd"
        });
    }
}

//=========recent search adding==================
router.post("/recentsearch",auth, (req, res) => {
    console.log(req.body)
    user.findByIdAndUpdate(userId, {search:req.body}, (e, r) => {
        if (e) {
            console.log(e)
        } else {
            console.log(r)
        }
    })
})


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
                                // console.log(e);
                                if (e.name === 'MongoError' && e.code === 11000) {
                                    res.send({
                                        emailError: "email should be unique"
                                    })
                                } else {
                                    res.send({
                                        error: "error occured"
                                    });
                                }
                            } else if (u) {
                                res.send({
                                    success: "user added"
                                })
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
                        username: user.username,
                        _id: user._id
                    }, secret))
                } else {
                    res.send("wrong Password");
                }
            })
        } else {
            res.send(
                "No user Found"
            )
        }
    })
})

//================seaching===================
router.post("/search", auth, (req, res) => {
    var options = {

        url: 'https://api.github.com/search/repositories?q=' +
            req.body.name +
            "+language:" + req.body.language +
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


//=============recent searches=================
router.get("/recentsearch",auth,(req,res)=>{
  user.findById(userId,'search',(e,data)=>{
   if(e){
   res.send("no data");
   }else{
       res.send(data)
   }
})    
})

module.exports = router