const express = require('express');
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const ticket = require('./routes/ticket');
const passenger = require('./routes/passenger');

require('dotenv/config')

const app = express();

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

app.use(express.json());
app.use('/api/ticket', ticket);
app.use('/api/passenger', passenger);
app.use('/admin', admin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Started the Development Server on Port: ${PORT}`);
});

/*LATER*/
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });