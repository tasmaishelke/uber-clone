const express = require('express');
const app = express();
const connectDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')
const mapRoutes = require('./routes/mapRoutes')
const rideRoutes = require('./routes/rideRoutes')


//middleware
const cors = require('cors');
app.use(cors());
const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(express.json());



app.get('/', (req, res) =>
    {
        res.send("hello world");
    });

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);
app.use('/map', mapRoutes);
app.use('/ride', rideRoutes);

const start = async() =>
    {
        await connectDb();
    };
start();

module.exports = app