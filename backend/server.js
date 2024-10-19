const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stationsRoutes = require('./routes/stationsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/stations', stationsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});