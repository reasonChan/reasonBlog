const jwt = require("jsonwebtoken");
const secretKey = "reason1251326862"
const JWT = {
    generate(value, expires){
        return jwt.sign(value, secretKey, {expiresIn: expires})
    },

    verify(token){
        try{
            return jwt.verify(token, secretKey)
        }catch (error){
            return false
        }
    }
}
module.exports = JWT