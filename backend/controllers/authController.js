// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/tx');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tx', txRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`UnionLedger backend running on port ${PORT}`);
});
