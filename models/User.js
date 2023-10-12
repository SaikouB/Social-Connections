// Creates Schema database through mongoose
const { Schema, model } = require('mongoose');
// User Schema is created
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// Creates virtual for friendCount and gets friends length
userSchema
.virtual('friendCount')
.get( function () {
    return this.friends.length;
})

const User = model('User', userSchema);
// Exports User Schema
module.exports = User;