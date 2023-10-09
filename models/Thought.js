const formattedDate = require('../utils/date');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formattedDate(date),

        },
        username: {
            type: String,
            require: true,
        },
        reactions: [{
            reactionBody: String,
            username: String,
            createdAt: {
                type: Date,
                default: Date.now,
                get: (date) => formattedDate(date)
            }
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;