const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

const API_KEY = '126596e1-9625-44d1-ba25-22cccd26a5b0';

app.use(cors());

app.use(express.static('public'));

app.get('/live-score', async (req, res) => {
    try {
        const response = await axios.get('https://api.cricapi.com/v1/currentMatches', {
            params: {
                apikey: API_KEY
            }
        });
        console.log('API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching live score:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        res.status(500).json({
            message: 'Error fetching score',
            error: error.message,
            ...(error.response && { details: error.response.data })
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
