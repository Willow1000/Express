const userDB = {
    users: require("../Data/users.json"),
    setUsers:function(data){
        this.users = data
    }
}

const { json } = require("express")
const jwt  = require("jsonwebtoken")
require("dotenv").config()

const handleRefreshToken = (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt
    const foundUser = userDB.users.find(x=>x.refreshToken===refreshToken)    
    if(!foundUser){
        return res.sendStatus(401)
    }else{
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err,decode)=>{
                if(err || foundUser.username!==decoded.username) return res.sendStatus(403)
                const accessToken = jwt.sign({
                    "username":decoded.username
            },process.env.ACCESS_TOKEN,{expiresIn:'30s'}) 
            res.json({accessToken})   
            }
            
        )
       
  
    }
}

module.exports = {handleRefreshToken}