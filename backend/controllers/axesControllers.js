const dfd = require('danfojs-node');
const path = require('path');

exports.getAllAxes = async (req, res) => {
    try {
        const csvPath = path.join(__dirname, '../data/nether_axes.csv');
        const stations = await dfd.readCSV(csvPath);
        const stationsJSON = dfd.toJSON(stations, { format: 'column' });
        res.json(stationsJSON);
    } catch (err) {
        res.status(500).json({ error: 'Nether axes import error.' });
    }
};