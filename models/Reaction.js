// Requires formatted date by dayjs package
const formattedDate = require('../utils/date');
// Creates Schema database through mongoose
const { Schema, model } = require('mongoose');

// Reaction Schema is created
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formattedDate(date),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Reaction = model('Reaction', reactionSchema);
// Exports reaction Schema 
module.exports = Reaction;