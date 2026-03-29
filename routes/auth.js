const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        req.user = decoded;
        next();
    });
};

// Route for Google OAuth
router.post('/google', async (req, res) => {
    const { token } = req.body;  
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();

    const jwtToken = jwt.sign({ email: payload.email, name: payload.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ jwt: jwtToken });
});

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

module.exports = router;