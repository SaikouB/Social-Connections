// Requires formatted date by dayjs package
const formattedDate = require('../utils/date');
// Creates Schema database through mongoose
const { Schema, model } = require('mongoose');
// Thought Schema is created
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
// Creates virtual for reactionCount and gets reactions length
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);
// Exports Thought Schema
module.exports = Thought;