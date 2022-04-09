const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'callmeRe@1B',
    database: 'tododatabase'
})


app.get('/api',(req,res)=>{
    const sqlCommand = "SELECT * FROM todolist";
    db.query(sqlCommand,(err,result)=>{
         res.send(result);
    })
})

app.post('/insert',(req,res)=>{
    let insert = req.body.userInput;
    const sqlCommand = "INSERT INTO todolist (text) VALUES (?)";

    db.query(sqlCommand,[insert],(err,result)=>{
        if(err)console.log(err);
        else console.log("data inserted successfully");
    })
    res.redirect('/');
})

app.delete('/delete/:id',(req,res)=>{
     const id = req.params.id;
     const sqlCommand = "DELETE FROM todolist WHERE id = ?";
     db.query(sqlCommand,id,(err,result)=>{
         if(err)console.log(err);
         else console.log("deleted successfully");
     })
})
app.listen(PORT,()=>{
    console.log(`Listening to the port at ${PORT}`)
})