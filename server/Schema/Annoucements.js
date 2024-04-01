const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Announcements = mongoose.model('Announcement', announcementSchema);

module.exports = Announcements;
