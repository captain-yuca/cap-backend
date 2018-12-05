import express from 'express'
import routes from './src/routes/levelEntryRoute'
import http from 'http'
import io from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { LevelEntrySchema } from './src/models/levelEntryModel'

const LevelEntry = mongoose.model('LevelEntry', LevelEntrySchema)
const PORT = 3000;


const app = express();

app.use(cors())

mongoose.Promise= global.Promise
mongoose.connect('mongodb://admin:capstone2018@ds117773.mlab.com:17773/fmds', {
    useMongoClient: true
})


app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
routes(app)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/level', (req, res) => {
    res.json({

    })
})

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const sock = io.listen(server, { origins: '*:*'})


var counter = 0;
setInterval(function()  { 
    sock.emit('message', {
        name: new Date().toISOString(),
        value: counter
    })
    let newEntry = new LevelEntry({level:counter})

    newEntry.save((err, entry) => {
        if(err){
            throw err;
        }
    })
    if(counter <1000){
        counter+= 100;
    }else {
        counter =0
    }
    

}, 3000);
