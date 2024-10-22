const dfd = require('danfojs-node');

exports.getAllStations = async (req, res) => {
    try {
        const stationsJSON = dfd.toJSON(req.stationsData, { format: 'column' });
        res.json(stationsJSON);
    } catch (err) {
        res.status(500).json({ error: 'Minetro stations import error' });
    }
};

exports.getClosestStation = async (req, res) => {
    try {
        const { x, z } = req.body;

        if (x === undefined || z === undefined) {
            return res.status(400).json({ error: 'Input coordinates error.' });
        }

        let minDistance = Infinity;
        let closestStation = null;

        req.stationsData.values.forEach(row => {
            const stationX = row[2];
            const stationZ = row[3];
            const distance = Math.round(
                Math.sqrt(Math.pow(stationX - x, 2) + Math.pow(stationZ - z, 2))
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestStation = row;
            }
        });

        if (!closestStation) {
            return res.status(404).json({ error: 'None station found error' });
        }

        res.json({
            code: closestStation[0],
            station: closestStation[1],
            x: closestStation[2],
            z: closestStation[3],
            distance: minDistance
        });
    } catch (err) {
        console.error('Station research error', err);
        res.status(500).json({ error: 'Station research error' });
    }
};