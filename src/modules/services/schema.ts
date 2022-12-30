import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,
    variationPrice: Object,

    duration: {
        type: Number,
        required: true,
        enum: [30, 60]
    },

    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    },

    price: {
        type: Number,
        required: true,
    }
})

export default schema;