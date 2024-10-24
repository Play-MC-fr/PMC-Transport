const dfd = require('danfojs-node');

exports.getAllAxes = async (req, res) => {
    try {
        const axesJSON = dfd.toJSON(req.axesData, { format: 'column' });
        res.json(axesJSON);
    } catch (err) {
        res.status(500).json({ error: '[Controllers] Nether axes import error.' });
    }
};