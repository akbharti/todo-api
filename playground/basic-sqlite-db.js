let Sequelize = require('Sequelize');
let sequelize = new Sequelize(undefined,undefined,undefined,{
    'dialect' : 'sqlite',
    'storage' : __dirname + 'basic-sqlite-database.sqlite'
});

let Todo = sequelize.define('todo',{
    description : {
        type : Sequelize.STRING
    },
    completed : {
        type : Sequelize.BOOLEAN
    }
})

sequelize.sync().then(()=>{
    console.log("Everything is synced");
})