import express from 'express'
import routes from './src/routes/levelEntryRoute'
import http from 'http'
import io from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { LevelEntrySchema } from './src/models/levelEntryModel'

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0')
const parser = port.pipe(new Readline({delimiter: '\r\n'}));
const PORT = 80;


const app = express();
mongoose.Promise= global.Promise
mongoose.connect('mongodb://admin:capstone2018@ds117773.mlab.com:17773/fmds', {
    useMongoClient: true
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
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
        let newEntry = new LevelEntry({level:temp})
        newEntry.save((err, entry) => {
            if(err){
                throw err;
            }
        })
    }
    catch(err){
        console.error(err);
    }

});
