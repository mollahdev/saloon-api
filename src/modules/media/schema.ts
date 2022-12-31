import mongoose from "mongoose";

const schema = new mongoose.Schema({
    alt     : String,
    size    : Number,
    mimetype: String,
    meta: Object,

    filename: {
        type: String,
        required: true
    },
    
    path: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default schema;