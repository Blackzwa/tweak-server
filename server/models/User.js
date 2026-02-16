
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: { type: String, default: 'viewer' },
    subscriptionActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
