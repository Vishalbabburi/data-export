var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "census_data",
    port: 3306
});

connection.connect();
 var query = connection.query(
     'select * from test', function (err, result, fields) {
         if (err) throw err;
         console.log('result: ', result);
     });

 connection.end();