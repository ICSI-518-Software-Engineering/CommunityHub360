const mongoose = require('mongoose');


const tenantParkingSchema = new mongoose.Schema({
    LotNum: {
        type: Number,
        required: true,
        unique: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('TenantParking', tenantParkingSchema);
