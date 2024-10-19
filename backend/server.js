const express = require('express');
const bodyParser = require('body-parser');
const stationsRoutes = require('./routes/stationsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/stations', stationsRoutes);

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
});