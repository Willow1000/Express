const crypt = require("bcrypt")

const {timingSafeEqual,scryptSync,randomBytes} = require("crypto")
const userDB={}
const signup = (username,passwd)=> {
    const salt = randomBytes(16).toString("hex")
    const hashedPasswd  = scryptSync(passwd,salt,64).toString("hex")
    userDB.username=username
    userDB.passwd = `${salt}:${hashedPasswd}`
}

const login= (username,passwd)=>{
    
    const usernameDB= userDB.username
    if(username===usernameDB){
        const [salt, passwdDB] = userDB.passwd.split(":")
        
        const apparentPasswd = scryptSync(passwd,salt,64).toString("hex")
        const match = timingSafeEqual(Buffer.from(apparentPasswd,'hex'),Buffer.from(passwdDB,'hex'))
        if(match){
            console.log("Log in successful")
        }else{console.log('log in was unsuccsseful')}
    }else{console.log('invalid username')}
        
}
signup('willow','banana')
login('willow','banan')

