let http = require("http");
let bodyParser = require('body-parser');
let express = require("express");
let _ = require("underscore");

let app = express();let PORT = 3000;
let todos = [];
let todoNextId = 1;


app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("Hola from Abhi side");
});

// GET /todos
app.get('/todos',(req,res) => {
        res.json(todos);   // we can send TEXT back & for
});

// GET /todos/:id
app.get('/todos/:id',(req,res) => {
// res.send(`Asking for todo with id of ${req.params.id}`);
   let todoid = parseInt(req.params.id,10);

 var matchedTodo = _.findWhere(todos,{id:todoid});


 matchedTodo ?  res.json(todos[todoid]) : res.status(404).send("Page not found");

//    //iterate of todos array. find the match
//     todos.forEach((item,index) =>{
//        if(item.id == todoid)
//          res.json(todos[index]);
//     })

//    res.status(404).send("Page not found");
})

//POST todo

app.post('/todos',(req,res)=>{
     let body = req.body;

if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0)
{
    return res.status(400).send("Bad request");
}

    //add id field
    body.id = todoNextId++;

    //push body into array
    todos.push(body);
     
     res.json(body);  
});
 

app.listen(PORT,()=>{
    console.log(`Express server is on port no. ${PORT}`);
});