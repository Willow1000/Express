const userDB = {
    users: require("../Data/users.json"),
    setUsers:function(data){
        this.users = data
    }
}

const fsPromises = require("fs/promises")

const crypt = require("bcrypt")



const handleNewUser = async (req,res)=>{
    const {user,pwd} = req.body
    try{
        const hashedPasswd =  await crypt.hash(pwd,10)
        const newUser = {username:user,password:hashedPasswd}
        userDB.setUsers([...userDB.users,newUser])
        await fsPromises.writeFile('./Data/users.json',JSON.stringify(userDB.users))
        console.log(userDB.users);
        res.status(201).json({"message":"new user was successfuly added"})
    }catch(err){
        console.error(err)
    }
}

module.exports = {handleNewUser}