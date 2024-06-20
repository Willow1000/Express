const userDB = {
    users: require("../Data/users.json"),
    setUsers:function(data){
        this.users = data
    }
}

const fsPromises = require("fs/promises")
const path = require("path")
const crypt = require("bcrypt")