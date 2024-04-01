const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'tenant',
        enum: ['tenant', 'admin','maintenance','security']
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number,
        required: true
    },
    isAccepted : {
        type : Boolean,
        default : false
    },

    HouseNum :{
        type : String,
        required: true
    },

});

module.exports = mongoose.model('User', userSchema);
