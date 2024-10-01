const jwt = require("jsonwebtoken")

const createToken = (userId, email)=>{
    return jwt.sign({userid : userId , email}, process.env.JWT_SECRET)
    
}

module.exports = createToken;