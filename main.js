const Express = require("express")
const server = Express()

let setPort;
const port = setPort || 4000
const path = require("path")
const {reqLog} = require("./Middleware/logs")
const {corsOptions, whitelist} = require("./Config/config")
const cors = require("cors")
const {errorLog} = require("./Middleware/error")

server.use('/',require('./Route/root'))
server.use("/employees",require('./Controller/employees'))
server.use(Express.static(path.resolve('Public')))
server.use(reqLog)
server.use(cors(corsOptions))

// server.get('/',(req,res)=>{
//     res.status(200).sendFile(path.resolve(__dirname,'Views','index.html'))
//     console.log(req.url);
// })
server.use(errorLog)

server.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})
