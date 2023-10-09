const formattedDate = require('../utils/date');
const { Schema, model } = require('mongoose');


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

module.exports = Reaction;