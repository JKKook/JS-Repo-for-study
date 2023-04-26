const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        trim: true,
        minlength: 5,
    },
    role: {
        type: Number,
        default: 0, // 1은 관리자 지정할 것임
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

const User = mongoose.model('users', userSchema);
const userSchemas = { User };

module.exports = userSchemas;
