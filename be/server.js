const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { initializeSocket } = require('./socket');

initializeSocket(server);

server.listen(process.env.PORT, () => 
    {
        console.log(`Socket.IO and Node.js server is running on port ${process.env.PORT}`);
    });