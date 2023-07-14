const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    image: { type: Buffer }
}, {
    timestamps: true
});

module.exports = mongoose.model('Images', ImageSchema);
