const router = require("express").Router()
const registerController = require('../Controller/registerController')

router.post('/',registerController.handleNewUser)

module.exports = router
