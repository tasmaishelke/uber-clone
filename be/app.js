const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cors = require('cors');

port = process.env.PORT || 3000;

app.use(cors());


app.get('/', (req, res) =>
    {
        res.send("hello world");
    });

const start = async() =>
    {
        app.listen(port, console.log(`Server is connected to port ${port}`));       
    };

start()