const dfd = require('danfojs-node');
const path = require('path');

exports.getAllStations = async (req, res) => {
    try {
        const csvPath = path.join(__dirname, '../data/minetro_stations.csv');
        const stations = await dfd.readCSV(csvPath);
        const stationsJSON = dfd.toJSON(stations, { format: 'column' });
        res.json(stationsJSON);
    } catch (err) {
        res.status(500).json({ error: 'Minetro stations import error.' });
    }
};

exports.findClosestStation = async (req, res) => {
    try {
        const { x, y } = req.body;

        if (x === undefined || y === undefined) {
            return res.status(400).json({ error: 'Input coordinates error.' });
        }

        const csvPath = path.join(__dirname, '../data/minetro_stations.csv');
        const stations = await dfd.readCSV(csvPath);
        let minDistance = Infinity;
        let closestStation = null;

        stations.values.forEach(row => {
            const stationX = row[2];
            const stationY = row[3];
            const distance = Math.round(
                Math.sqrt(Math.pow(stationX - x, 2) + Math.pow(stationY - y, 2))
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestStation = row;
            }
        });

        if (!closestStation) {
            return res.status(404).json({ error: 'None station found error.' });
        }

        res.json({
            code: closestStation[0],
            station: closestStation[1],
            x: closestStation[2],
            y: closestStation[3],
            distance: minDistance
        });
    } catch (err) {
        console.error('Station research error', err);
        res.status(500).json({ error: 'Station research error.' });
    }
};