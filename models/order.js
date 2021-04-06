const mongoose = require('mongoose');

//create schema
const orderSchema = mongoose.Schema({
   orderItems: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
   zip: {
       type: String,
       required: true
   },
   country: {
       type: String,
       required: true
   },
   phone: {
       type: String,
       required: true
   },
   status: {
       type: String,
       required: true,
       default: 'Pending'
   },
   totalPrice: {
       type: Number
   },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   dateOrdered: {
       type: Date,
       default: Date.now
   },


})


orderSchema.virtual('id').get(function () { 
     return this._id.toHexString();
 });

orderSchema.set('toJSON', {
    virtuals: true,
}); 

//create model
exports.Order = mongoose.model('Order', orderSchema);
/*
{
    "orderItems": [
        {
            "quantity": 3,
            "product": ""
        },
        {
            quantity:2,
            "product":""
        }
    ],
    "shippingAddress1": "flowers street, 45",
    "shippingAddress2": "1-B",
    "city": "colombo",
    "zip": "60036",
    "country": "sri-lanka",
    "phone": "0897766543",
    "status": "",
    "totalPrice": "767",
    "user":"",
    "dateOrdered":


}*/