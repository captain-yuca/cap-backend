const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0');
const parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('data', (temp) => {
    console.log("Data: " + temp);
});