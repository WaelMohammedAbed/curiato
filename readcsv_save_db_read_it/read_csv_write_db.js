var csv = require("fast-csv");
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    database : 'testnode'
});

var page=-1;
connection.connect();
var parser =csv
    .fromPath("test.csv")
    .on("data", function(data){
        //parser.pause();
        page=page+1;
        if(page>0) {// ignore the header row
            var row=48*(page-1)
            for (var j = 0; j < 48; j++) {

                var col = 0;
                for (var i = 24 * j; i < 24 * (j + 1); i++) {
                    if(data === null && data === undefined && data.length===0) {
                        break;
                    }
                   // var post = {"row": j, "col": col, "page": page, "data": data[i]};
                   // var query = connection.query('INSERT INTO test SET ?', post, function (error, results, fields) {
                     var post = {"row": row, "col": col, "data": data[i]};
                     var query = connection.query('INSERT INTO test2 SET ?', post, function (error, results, fields) {
                        if (error)
                            console.log(error.message);
                        else
                            console.log(results);
                    });

                    col = col + 1;
                }
                row=row+1
            }
        }
        console.log(page);
        //parser.resume();
    }).on("end", function(){
        connection.end();
        console.log("done reading file, please wait while saving it in to db");
    });


