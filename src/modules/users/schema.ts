import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type        : String,
        required    : [true, "Name is required"],
        minlength   : [4, "Name must be more than 3 letters"],
        trim        : true,
    },
    
    username: {
        type        : String,
        required    : true,
        lowercase   : true,
        trim        : true,
        unique      : true,
    },
    
    password: {
        type    : String,
        required: true,
        trim    : true,
    },
    
    email: {
        type    : String,
        required: true,
        unique  : true,
        trim    : true
    },
    
    phone: {
        type    : Number,
        required: true,
        unique  : true
    },
    
    role: {
        type    : String,
        required: true,
        enum: {
            values: ['admin', 'editor', 'viewer'],
            message: "{VALUE} is not supported"
        }
    },

    image: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ['active', 'inactive'],
            message: "{VALUE} is not supported"
        }
    },
})

export default schema;