const mongoose = require('mongoose');

const validateLotNum = (value) => {
    return value >= 1 && value <= 15;
};

const guestParkingSchema = new mongoose.Schema({
    isAssigned: {
        type: Boolean,
        default: false
    },
    carType: {
        type: String,
        required: true
    },
    VehicleNum: {
        type: String,
        required: true
    },
    LotNum: {
        type: String,
        validate: [validateLotNum, 'LotNum must be between 1 and 15']
    },
    Name: {
        type: String,
        required: true
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    requestedFrom: {
        type: Date,
        required: true
    },
    requestedTo: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('GuestParking', guestParkingSchema);
