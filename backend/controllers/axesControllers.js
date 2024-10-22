const dfd = require('danfojs-node');

exports.getAllAxes = async (req, res) => {
    try {
        const stationsJSON = dfd.toJSON(req.stationsData, { format: 'column' });
        res.json(stationsJSON);
    } catch (err) {
        res.status(500).json({ error: 'Nether axes import error.' });
    }
};