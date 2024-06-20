const {logEvents} = require('./logs')


const errorLog = (err,req,res,next)=>{
    logEvents(`${err.name} ${err.message}`,'errors.txt')
    next()
}

module.exports = {errorLog}