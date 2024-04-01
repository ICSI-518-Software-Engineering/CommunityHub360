const mongoose = require("mongoose");

const GuestParkingSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    licenseplate: String,
    state: String,
    vehicletype: String,
    dos: String,
    doe: String,
    amount: String,
});

const GuestParking = mongoose.model("GuestParkingSchema", GuestParkingSchema);

module.exports = GuestParking;