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

// GET /todos?completed=flase&q=work
app.get('/todos', (req, res)=> {
    var queryParams = req.query;
    console.log(queryParams);
	var filteredTodos = todos;

    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        console.log('False');
        filteredTodos = _.where(filteredTodos, {completed: false});
        console.log(filteredTodos);
	} else  if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        console.log('true');
        filteredTodos = _.where(filteredTodos, {completed: true});
        console.log(filteredTodos);
	}

//q=work    
  if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
      filteredTodos = _.filter(filteredTodos,(todo) =>{
          return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
      });
  }

	res.json(filteredTodos);
});


// GET /todos/:id
app.get('/todos/:id',(req,res) => {

// res.send(`Asking for todo with id of ${req.params.id}`);
   let todoid = parseInt(req.params.id,10);

 let matchedTodo = _.findWhere(todos,{id:todoid});

 matchedTodo ?  res.json(matchedTodo) : res.status(404).send("Page not found");
})



//POST todo
app.post('/todos',(req,res)=>{ 
      console.log(req.body);
     let body = _.pick(req.body,'description','completed');

if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0)
{
    return res.status(400).send("Bad request");
}

    body.description = body.description.trim();
    body.id = todoNextId++;
    
   todos.push(body);
  
     res.json(body);  
});
 


// DELETE /todo/:id
app.delete('/todos/:id',(req,res) => {
    var todoId = parseInt(req.params.id,10);
    let matched = _.findWhere(todos,{id:todoId});

    if(!matched){
        res.status(404).json({"error": "no todo found with that id"});
    }
        else{
            todos = _.without(todos,matched);
            res.json(matched);
        }
    
});

//PUT /todos/:id UPDATE
app.put('/todos/:id',(req,res)=>{
    let todoId = parseInt(req.params.id,10);
    let matchedTodo = _.findWhere(todos,{id:todoId});
    let body = _.pick(req.body,'description','completed');
    let valideAttribute = {};

    if(!matchedTodo)
        return res.status(404).send();
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        valideAttribute.completed = body.completed;
    }else
        if(body.hasOwnProperty('completed')){
                return res.status(400).send();
    } 

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
        valideAttribute.description = body.description;
    }else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    }

    //HERE 
    _.extend(matchedTodo,valideAttribute);  // upadte todo
   res.json(matchedTodo);
});


app.listen(PORT,()=>{
    console.log(`Express server is on port no. ${PORT}`);
});