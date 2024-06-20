const path = require("path")             
const rout = require('express').Router()
// const data = {}
let data;
const employees = require('../Data/employees.json')
const fs = require("fs")

rout.route("/")
    .get((req,res)=>{  
       if(Object.keys(req.query).length!==0){
            req.query.name?data=employees.filter(x=>x.Name===req.query.name):null
            req.query.department?data =employees.filter(x=>x.Department===req.query.department):null
            req.query.id?data = employees.find(x=>x.id===parseInt(req.query.id)):null
            req.query.name&&req.query.department?data=employees.filter(x=>x.Department===req.query.department&&x.Name===req.query.name):null
            res.json(data)
       }else{
            res.json(employees)
       }
       
    })
    .post((req,res)=>{
        const idList = employees.map(x=>x.id)

        const id = idList.sort((a,b)=>a-b).reverse()[0] + 1 || 1
        const newEmployee = {
            id:id,
            Name:req.query.name,
            Department:req.query.department
        }
        employees.push(newEmployee)

        fs.writeFileSync("./Data/employees.json",JSON.stringify(employees))
        
        console.log('new employee was successfully added')
    })
    .put((req,res)=>{
    })
    .delete((req,res)=>{

    });

rout.route("/:id")    

module.exports = rout    