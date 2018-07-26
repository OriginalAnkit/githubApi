var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        minlength:1
    },
    email:{
        required:true,
        unique:true,
        type:String,
        validate:{
            validator:(e)=>{
            return /\S+@\S+\.\S+/.test(e)
            },
            message:"not a Valid Email"
        }   
    },
    password:{
        required:true,
        type:String
    }
});


module.exports=mongoose.model("user",userSchema);