let http = require("http");
let express = require("express");
let app = express();
let PORT = 3000;
let todos = [
    {
        id : 1,
        description  : 'task express',
        completed : false
    },
    {
        id : 2,
        description  : 'learn GIT',
        completed : false
    },
    {
        id : 3,
        description  : 'learn Javascript',
        completed : true
    }
];

app.get('/',(req,res) => {
    res.send("Hola from Abhi side");
});

// GET /todos
app.get('/todos',(req,res) => {
        res.json(todos);   // we can send TEXT back & for
})

// GET /todos/:id
app.get('/todos/:id',(req,res) => {
   // res.send(`Asking for todo with id of ${req.params.id}`);
   let todoid = req.params.id;

   //iterate of todos array. find the match
    todos.forEach((item,index) =>{
       if(item.id == todoid)
         res.json(todos[index]);
    })

   res.status(404).send("Page not found");
})




app.listen(PORT,()=>{
    console.log(`Express server is on port no. ${PORT}`);
});