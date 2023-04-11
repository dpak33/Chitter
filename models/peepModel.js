const mongoose = require('mongoose');

const peepSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            maxlength: 150,
        },
        username: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const peepModel = mongoose.model('peeps', peepSchema);
module.exports = peepModel;