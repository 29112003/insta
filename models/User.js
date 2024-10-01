const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/inst-clone", )
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required:true,
        minlength:3,
        maxlength:30,
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    profilePicture:{
        type:Buffer,
        required:false,
    },
    bio:{
        type:String,
        maxlength:200,
        required:false,
    },
    followers : {
        type:Array,
        default:[]
    },
    following :{
        type:Array,
        default:[]
    }
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;