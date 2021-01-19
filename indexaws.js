const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : "awstesting.cevlyoskpoxh.us-east-1.rds.amazonaws.com",
    user     : "admin",
    password : "StarkD03",
    port     : "3306"
  });
db.connect(function(err){
    if(err){
        console.log('Error in connecting');
    }
    console.log('Connected RDS');
});
app.get('/create',(req,res) =>{
    db.query(`CREATE DATABASE gregory`,function(err){
        if(err){
            throw new Error('Error in creating database');
        }
    })
    db.query(`use gregory`,function(err){
        if(err){
            throw new Error('Error in using');
        }
    });
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