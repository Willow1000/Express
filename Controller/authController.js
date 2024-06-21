const userDB = {
    users: require("../Data/users.json"),
    setUsers:function(data){
        this.users = data
    }
}

const crypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
require("dotenv").config()
const fsPromises = require("fs/promises")


const handleLogin = async (req,res)=>{
    const {user,pwd} = req.body
    if(!user || !pwd) return res.json({message:'username and password are required'})
    const foundUser = userDB.users.find(x=>x.username===user)    
    if(!foundUser){
        return res.sendStatus(401)
    }else{
        const match = await crypt.compare(pwd, foundUser.password )
        if(match){
            // 
            const accessToken = jwt.sign({username:foundUser.username},process.env.ACCESS_TOKEN,{expiresIn:'30s'})
            const refreshToken = jwt.sign({username:foundUser.username},process.env.REFRESH_TOKEN,{expiresIn:'1d'})
            // Saving refreshToken with current User
            const otherUsers = userDB.users.filter(x=>x.username!==foundUser.username)
            const currentUser = {...foundUser,refreshToken}
            userDB.setUsers([...otherUsers,currentUser])
            await fsPromises.writeFile('./Data/users.json',JSON.stringify(userDB.users))
            res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000})
            res.json({accessToken})

            
        }else{return res.json({message:"log in was unsuccessful"})}
    }
}

module.exports = {handleLogin}