const cors = require('cors')
const express= require('express')
const {db, User} = require('./db/dbindex')

const app=express()
app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.use(cors());

app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    response.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const PORT_NUMBER=61550;
app.use('/', require('./route')); 

db.sync().then(() => {
    console.log('Database Synced')
    User.create({
        name: "rishabh",
        email:"rishabh@gmail.com",
        age:23
    })
    app.listen(PORT_NUMBER, () => {
        console.log(`UserService started at http://localhost:${PORT_NUMBER}`)
    });
}).catch(console.error)



