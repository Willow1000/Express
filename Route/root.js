const {Router} = require("express")
const path = require("path")
const rout = Router()

rout.get("^/$|index(.html)?",(req,res)=>{
    res.status(200).sendFile(path.resolve('views','index.html'))
})

module.exports = rout