const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const stationsRoutes = require('./routes/stationsRoutes');
const playersRoutes = require('./routes/playersRoutes');
const axesRoutes = require('./routes/axesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedIPs = ['104.28.99.216'];

app.use((req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (allowedIPs.includes(clientIP)) {
        next();
    } else {
        res.status(403).json({ message: 'Accès refusé : IP non autorisée' });
    }
});

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/stations', stationsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/axes', axesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});