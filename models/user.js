const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    passwordHash: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    street: {
        type:String,
        default:'',
    },
    apartment: {
        type:String,
        default:''
    },
    zip: {
        type:String,
        default:'',
    },
    city: {
        type:String,
        default:'',
    },
    country: {
        type:String,
        default:'',
    }
    
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
    
});

userSchema.set('toJSON',{
    virtual: true,
});

//create model
exports.User = mongoose.model('User', userSchema);
export.userSchema = userSchema;