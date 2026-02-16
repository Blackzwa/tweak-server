
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function auth(req, res, next) {
    try {
        req.user = jwt.verify(req.headers.authorization, 'secret');
        next();
    } catch {
        res.status(401).send('Unauthorized');
    }
}

router.post('/activate', auth, async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { subscriptionActive: true });
    res.send('Subscription activated');
});

router.get('/status', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.send({ active: user.subscriptionActive });
});

module.exports = router;
