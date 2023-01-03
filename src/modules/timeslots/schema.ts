import mongoose from "mongoose";

const schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },

    uname: {
        type: String,
        required: true,
    },

    timestamps: {
        type: Array,
        required: true
    }
})

export default schema;