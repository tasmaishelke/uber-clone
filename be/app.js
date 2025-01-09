const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const connectDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')


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

const start = async() =>
    {
        await connectDb();
        app.listen(process.env.PORT, console.log(`Server is connected to port ${process.env.PORT}`));       
    };

start();