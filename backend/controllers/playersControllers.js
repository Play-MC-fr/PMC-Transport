const dfd = require('danfojs-node');
const path = require('path');

exports.getPlayerLocation = async (req, res) => {
    try {
        const { player } = req.body;

        if (player === undefined) {
            return res.status(400).json({ error: 'Input player name error.' });
        }

        const pmcApiUrl = `http://localhost:7070/api/location/${player}`;
        console.log(`Request sending with player name : ${player}`);

        const response = await fetch(pmcApiUrl, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'API_KEY_123',
            },
        });

        const responseText = await response.text();
        console.log('Response :', responseText);
        res.json(JSON.parse(responseText));

    } catch (err) {
        console.error('Player location error', err);
        res.status(500).json({ error: 'Player location error' });
    }
};