const mongoose = require('mongoose');

//create schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String

    }],
    brand: {
        type: String,
        default: 0
    },
    price: {
        type: Number,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min:0,
        max:255
    },
    rating: {
        type: String,
        default: 0
    },
    numReviews: {
        type: String,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

    
   
})

//create model
exports.Product = mongoose.model('Product', productSchema);