const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

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
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [{
            reactionBody: String,
            username: String,
            createdAt: Date,
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
.get( function () {
    return this.reactions.length;
})


const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;