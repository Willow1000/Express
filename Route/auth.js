const rout = require('express').Router()
const loginHandler = require("../Controller/authController")
rout.post('/',loginHandler.handleLogin)

module.exports=rout