const path = require('path');
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.static(publicPath))
io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('createMessage', (message) => {
        console.log("Message created", message);
        io.emit('newMessage', message)
    });
    socket.on('disconnect', function () {
        console.log("Disconnected from user")
    });
});


server.listen(port, () => {
    console.log(`App is running on ${port}...`)
})