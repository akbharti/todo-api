let express = require("express");
let app = express();

let PORT = 3000;

app.get('/',(req,res) => {
    res.send("hola from abhi");
});

app.listen(PORT,()=>
{
    console.log(`Express server on port no. ${PORT}`);
});