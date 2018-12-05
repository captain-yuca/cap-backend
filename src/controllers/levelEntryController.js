import mongoose from 'mongoose'
import { LevelEntrySchema } from '../models/levelEntryModel'

const LevelEntry = mongoose.model('LevelEntry', LevelEntrySchema)

export const addEntry = (req, res) => {
    let newEntry = new LevelEntry(req.body)

    newEntry.save((err, entry) => {
        if(err){
            res.send(err)
        }
        res.json(entry)
    })
}

export const getEntries = (req,res) => {
    LevelEntry.find({}, (err, entry) => {
        if(err){
            res.send(err)
        }
        res.json(entry)
    })
}