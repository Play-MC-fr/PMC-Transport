const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dfd = require('danfojs-node');
const path = require('path');

const stationsRoutes = require('./routes/stationsRoutes');
const playersRoutes = require('./routes/playersRoutes');
const axesRoutes = require('./routes/axesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

let stationsData = null;
let axesData = null;

const loadCSV = async () => {
    try {
        const stationsPath = path.join(__dirname, 'data/minetro_stations.csv');
        const axesPath = path.join(__dirname, 'data/nether_axes.csv');
        stationsData = await dfd.readCSV(stationsPath);
        axesData = await dfd.readCSV(axesPath);
        console.log('CSV loaded successfully');
    } catch (err) {
        console.error('CSV loading error', err);
    }
}

loadCSV();

// const allowedOrigins = ['https://sukikui.github.io/PMC-Transport/'];
//
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

const corsOptions = {
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-KEY']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/stations', (req, res, next) => {
    req.stationsData = stationsData;
    next();
}, stationsRoutes);

app.use('/api/axes', (req, res, next) => {
    req.axesData = axesData;
    next();
}, axesRoutes);

app.use('/api/players', playersRoutes);

// No listening for Vercel serverless
module.exports = app;
