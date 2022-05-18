const mongoose = require('mongoose');

const billSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a name.'],
        },
        repeat: {
            type: String,
            required: [true, 'Please add a repeat pattern.'],
        },
        dueDate: {
            type: Number,
            required: [true, 'Please add a due date.'],
        },
        dueMonth: {
            type: Number,
        },
        category: {
            type: Number,
            required: [true, 'Please add a category.'],
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Bill', billSchema);