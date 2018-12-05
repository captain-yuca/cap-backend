import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LevelEntrySchema = new Schema( {
    level: {
        type: Number,
        required: 'Enter the value'
    },
    date: {
        type: Date,
        default: Date.now
    }
})