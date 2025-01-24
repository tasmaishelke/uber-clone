const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = 4000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});