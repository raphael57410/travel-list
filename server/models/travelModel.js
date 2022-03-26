const mongoose = require("mongoose");

const TravelModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    img: String,
    description: String,
});

module.exports = mongoose.model('travel', TravelModel, 'travel');