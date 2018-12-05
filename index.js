import express from 'express'
import routes from './src/routes/levelEntryRoute'
import http from 'http'
import io from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM1')
const parser = port.pipe(new Readline({delimiter: '\r\n'}));
const PORT = 3000;


const app = express();

app.use(cors())



routes(app)

app.get('/', (req, res) => {
    res.send("Hello World")
})

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const sock = io.listen(server, { origins: '*:*'})


parser.on('data', (temp) => {
    try{
        sock.emit('message', {
            name: new Date().toISOString(),
            value: temp
        })
    }
    catch(err){
        console.error(err);
    }

});
