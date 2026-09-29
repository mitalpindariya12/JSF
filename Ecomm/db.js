const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Student@123",
    database:"ecommerce",
    port:3306
});

connection.connect((err)=>{
    if(err){
        console.log("Connection Failed");
        console.log(err);
    }
    else{
        console.log("Database Connected Successfully");
    }
});
module.exports = connection;