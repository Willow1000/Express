const rout = require('express').Router()
const loginHandler = require("../Controller/refreshTokenController")
rout.get('/',loginHandler.handleRefreshToken)

module.exports=rout