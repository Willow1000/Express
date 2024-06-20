const {format} = require("date-fns")
const {v4:uuid} = require("uuid")
const path = require('path')
const { log } = require("console")
const fs = require("fs")
const fsPromises = fs.promises


const logEvents = (message,file)=>{
    const date = format(new Date(),'yyyy-mm-dd\s hh:MM:ss')
    const logMessage = `${uuid()} ${date} ${message}\n`

    if(!fs.existsSync('./Logs')){
        fsPromises.mkdir("../Logs")
    }
    fsPromises.appendFile(`./Logs/${file}`,logMessage)

}

const reqLog = (req,res,next)=>{
    logEvents(req.url,'logs.txt')
    next()
}

module.exports = {logEvents,reqLog}
