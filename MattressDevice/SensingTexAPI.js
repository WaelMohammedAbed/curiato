var SerialPort = require('serialport');
var Data;
var IsDataready=false;

var ByteData;
var IsByteDataready=false;

/*
var enumReadDataState=
{
    COMMAND:"COMMAND",
    ROWS_PER_COLUMN:"ROWS_PER_COLUMN",
    COLUMN:"COLUMN",
    DATA:"DATA",
    END_OF_LINE:"END_OF_LINE",
    EXIT:"EXIT",
    DATA_READY:"DATA_READY",
    ERROR:"ERROR"
}
var ReadDataState=enumReadDataState.COMMAND;
*/
var port;
var portPath = "";//example /dev/tty-usbserial1
var Rows = 0;
var Columns = 0;
var BaudRate = 115200;
var Parity = "none";
var DataBits = 8;
var StopBits = 1;
var init=false;
var IsOpened=false;
module.exports=
    {
        "init": function (portName,row,columns) {
            portPath = portName;
            Rows=row;
            Columns=columns;
            port = new SerialPort(portPath, { autoOpen: false,baudRate: BaudRate,dataBits: DataBits,stopBits:StopBits,parity:Parity });
            init=true;
        },
        "openPort": function open (callback) {
            if(!init)
            {
                callback("not initialized",false);
            }else
            {
                port.open(function (err) {
                    if (err) {
                        callback('Error opening port: '+ err.message,false);
                    }
                    else
                    {
                        callback(null,true)
                    }
                });
                port.on('open', function() {
                    IsOpened=true;

                });
            }
        },
        "closePort": function close (callback) {
            if(!IsOpened)
            {
                callback("port not even opened",false);
            }else
            {
                port.close(function (err) {
                    if (err) {
                        callback('Error closing port: '+ err.message,false);
                    }
                    else
                    {
                        IsOpened=false;
                        callback(null,true)
                    }
                });

            }
        },
        "listPorts": function listPort(callback) {
            SerialPort.list(function (err, ports) {
                if(err)
                    callback(err,null);
                else {
                    var array = [];
                    ports.forEach(function (port) {
                        array.push(port.comName);
                    });
                    callback(null,array);
                }
            });

        },
        "SetZeroData": function () {
            var data = [];

            for (var x = 0; x < Rows; x++)
            {var datacol = [];
                for (var y = 0; y < Columns; y++)
                {
                    datacol.push(0.0);
                }
                data.push(datacol)
            }
            IsDataready=true;
            Data=data
        },
        "SetRandomData": function () {
            var data = [];

            for (var x = 0; x < Rows; x++)
            {var datacol = [];
                for (var y = 0; y < Columns; y++)
                {
                    datacol.push(Math.random());
                }
                data.push(datacol)
            }
            IsDataready=true;
            Data=data
            //return data;
        },
        "readAllData":function readAllData(callback) {
            IsDataready=false
            port.on('data', function (data) {
                Data=data;
                IsDataready=true;
                callback(data);
            });


        },
        "readByteData":function readByteData(callback) {
            IsByteDataready=false
            port.on('readable', function () {
                ByteData=data;
                IsByteDataready=true;
                callback(port.read(1));
            });
        },
        "getData":function () {
            if(IsDataready)
            return Data;
            else
                return null;
        },
        "getByteData":function () {
            if(IsByteDataready)
            return ByteData;
            else
                return null
        },
        "GetCoordinate": function GetCoordinate(row, col){
            var retval;

            if (row >= 1 && row <= Rows && col >= 1 && col <= Columns)
            {
                retval = Data[row - 1][ col - 1];
            }
            else
            {
                retval = 0;
            }

            return retval;
        },
        "IsDataReady":function () {
            return IsDataready;
        }


    };
