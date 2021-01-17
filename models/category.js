const mongoose = require('mongoose');

//create schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon:{
        type: String,
    },
    color:{
        type: String,
    }
    
})

//create model
exports.Category = mongoose.model('Category', categorySchema);