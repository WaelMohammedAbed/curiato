//create variable form file SensingTextApi
var MattressDevice=require("./SensingTexAPI");
// user promise to package to handle async behaviour of Node js
var Promise = require('promise');


var promise = new Promise(function (resolve, reject) {
//call function to list all available ports
        MattressDevice.listPorts(function(err,data) {
            if (err) {
                // error handling code goes here
                reject(err);
                //console.log("ERROR : ", err);
            } else {
                resolve(data)
            }


            });

});
//wait until get result for ports list
promise.then(function(v) {
    if(v===null || v===undefined || v.length===0)
        v=["SIM"];// give default value for port name in case there is no ports and we are just testing
    portPath="example /dev/"+v[0];//example /dev/tty-usbserial1"
    
//initialize Mattress Device  with port path, row and column for expected data
    MattressDevice.init(portPath,48,24)
    console.log(v); // 1
// open port
    MattressDevice.openPort(function(err,data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            if(data) {
                // if port open successful read data
                MattressDevice.readAllData(function (err,alldata) {
                    if(err)
                    {

                    }
                    else
                    {
                        console.log(alldata)
                    }
                });
                // read data after checking if the data is ready or not
                if(MattressDevice.IsDataReady)
                {
                    console.log(MattressDevice.getData())
                }
                // test function set zerodata then print the data
                MattressDevice.SetZeroData()
                console.log(MattressDevice.getData())
                // test function set random data then print the data
                MattressDevice.SetRandomData()
                console.log(MattressDevice.getData())
                // test function get data by row and column
                console.log(MattressDevice.GetCoordinate(1, 1))
            }
        }



    });

})
promise.catch(function (err) {
    console.log("Promise Rejected"+ err);
});
