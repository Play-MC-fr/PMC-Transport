require('dotenv').config();

const PMC_DOMAIN_URL = process.env.PMC_DOMAIN_URL;
const PMC_API_KEY = process.env.PMC_API_KEY;

exports.getPlayerLocation = async (req, res) => {
    try {
        const { player } = req.body;

        if (player === undefined) {
            return res.status(400).json({ error: 'Input player name error.' });
        }

        const API_URL = `http://${PMC_DOMAIN_URL}/api/location/${player}`;
        console.log(`Request sending with player name : ${player}`);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-API-KEY': `${PMC_API_KEY}`,
            },
        });

        const responseText = await response.text();
        console.log('Response :', responseText);

        if (!response.ok) {
            console.error(`HTTP error: ${response.status} - ${response.statusText}`);
            throw new Error(`HTTP error: ${response.status}`);
        }

        res.json(JSON.parse(responseText));

    } catch (err) {
        console.error('Player location error', err);
        res.status(500).json({ error: 'Player location error' });
    }
};