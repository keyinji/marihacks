require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const lobbyRoutes = require('./routes/lobbyRoutes');

const app = express();
app.use(express.json());

const lobbyRouter = require('./routes/lobbyRoutes')
app.use('./lobbyRoutes', lobbyRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

console.log('MongoDB connected');
app.listen(3000, () => console.log('Server running on port 3000'));