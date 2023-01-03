import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        select: false
    }
});

export const Books = mongoose.model('Books', bookSchema);