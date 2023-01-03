import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
        default: 1
    },
    actived: {
        type: Boolean,
        required: true,
        default: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    __v: {
        select: false
    }
});

export const Users = mongoose.model('Users', userSchema);
