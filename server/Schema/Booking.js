const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    bookingType: { type: String, required: true },
    attendees: { type: Number, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'Pending' } // Assuming status can be 'Pending', 'Confirmed', 'Cancelled', 'Completed'
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;


