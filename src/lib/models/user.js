import mongoose, { Schema } from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'is required.'],
    }, 
    email: {
        type: String,
        required: [true, 'is required.'],
        index: true,
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'is required.'],
    },
    contact:[
        {
            type: mongoose.Types.ObjectId, 
            ref: "Contact"
        }
    ]
    
},{timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userModel);