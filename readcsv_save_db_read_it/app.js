//var csvsave = require("./read_csv_write_db");

var read=require("./read_from_db");

read.getData(431,23, function(err,data) {
    if (err) {
        // error handling code goes here
        console.log("ERROR : ", err);
    } else {
        // code to execute on data retrieval
        if(data !== null && data !== undefined && data.length>0)
        console.log("result from db is : ", data[0].data);
    }
});

