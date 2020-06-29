//MODULE IMPORTS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')

//ROUTE IMPORTS
const admin = require('./routes/admin');
const ticket = require('./routes/ticket');
const passenger = require('./routes/passenger');

(async function connectDB() {
    try {
        const URI = process.env.DB_URI;
        const connect = await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to the database:", connect.connections[0].name);
    } catch (err) {
        console.log("Error connecting the database", err);
    }
})();

const app = express();
app.use(express.json());
app.use('/api/admin', admin);
app.use('/api/passenger', passenger);
app.use('/api/ticket', ticket);

app.listen(process.env.PORT, () => {
    console.log("Starting the development Server on Port:", process.env.PORT);
});