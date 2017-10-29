var csv = require("fast-csv");
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    database : 'testnode'
});

var page=0;
connection.connect();
module.exports=
    {
        //"getData":function getData(row,col,page,callback){
        "getData":function getData(row,col,callback){
            var userId = 'some user provided value';
            var sql    = 'SELECT * FROM test2 WHERE row = ' + connection.escape(row)+' and col = ' + connection.escape(col);
            connection.query(sql, function (error, results,fields) {
                if (error)
                    callback(error,null);
                else
                    callback(null,results);

            });
        }
    }