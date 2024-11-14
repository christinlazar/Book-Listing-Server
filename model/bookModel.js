
const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const bookModel = mongoose.model('Book',bookSchema)
module.exports = bookModel