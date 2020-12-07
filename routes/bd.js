var mysql=require('mysql');

var conexion=mysql.createConnection({
    host:'remotemysql.com', 
   user:'TDaU6Ub9tg', 
   password:'DmwpNN0kYc', 
   database:'TDaU6Ub9tg' 
});

conexion.connect(function (error){
    if (error)
        console.log('Problemas de conexion con mysql');
    else
        console.log('se inicio bien');
});


module.exports=conexion;

