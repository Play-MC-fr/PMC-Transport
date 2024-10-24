const dfd = require('danfojs-node');

exports.getAllPortals = async (req, res) => {
    try {
        const portalsJSON = dfd.toJSON(req.portalsData, { format: 'column' });
        res.json(portalsJSON);
    } catch (err) {
        res.status(500).json({ error: '[Controllers] Nether portals import error.' });
    }
};