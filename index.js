const express = require('express');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'********',
    database:'nodeDataBase'
});

app.get('/createTable',(req,res) =>{
    let sql = `CREATE TABLE info(
        ID INT,
        NAME VARCHAR(100),
        AGE INT,
        ADDRESS VARCHAR(100),
        PRIMARY KEY(ID)
        )`;
    db.query(sql,(err,results) =>{
        if(err){
            throw err;
        }
        res.send(results);
    })
});

app.get('/insert',(req,res) =>{
    let sql = `INSERT INTO info SET ?`;
    let information = [
        {ID: 1, NAME:'Shadman',AGE:20,ADDRESS:'Dhaka, Bangladesh'},
        {ID: 2, NAME:'Shadman',AGE:20,ADDRESS:'Dhaka, Bangladesh'},
        {ID: 3, NAME:'Shadman',AGE:20,ADDRESS:'Dhaka, Bangladesh'},
        {ID: 4, NAME:'Shadman',AGE:20,ADDRESS:'Dhaka, Bangladesh'},
        {ID: 10, NAME:'Shadman',AGE:20,ADDRESS:'Dhaka, Bangladesh'}
    ];
    information.forEach(eachInfo =>{
        db.query(sql,eachInfo,(err,result) =>{
            if(err){
                throw new Error('Error in inserting data');
            }
        });
    });
    res.send("All datas inserted");
});

app.get('/fetch',(req,res) =>{
    let sql = `SELECT * FROM info`;
    db.query(sql,(err,result) =>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.get('/update/:id',(req,res)=>{
    let id = req.params.id;
    let newAddress = 'Hanoi, Vietnam';
    let sql = `UPDATE info SET ADDRESS='${newAddress}' WHERE ID='${id}'`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
    });
    res.send('Updating success');
})

app.listen(3000,() =>{
    console.log('Listening to port 3000');
});