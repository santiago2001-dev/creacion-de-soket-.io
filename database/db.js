const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: "localhost",
    password :"",
    user: "root",
    port: "3306",
    database :"socket"
})

conexion.connect((error)=>{
    if(error){
       console.log('error de :'+error);
    }else{
        console.log('conexiona a base exitosa');
    }
})
module.exports = conexion;