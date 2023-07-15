const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    email: { type: String, require: true},
    image: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Images', ImageSchema);
