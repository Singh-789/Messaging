const path = require('path');
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app)
const io = socketIO(server)
const {generateMessage} = require('./utils/message')
app.use(express.static(publicPath))
io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('createMessage', (message,callback) => {
        console.log("Message created", message);
        // io.emit('newMessage', message)
        socket.emit('newMessage',generateMessage("Admin","Welcome to the chat Application"));
        socket.broadcast.emit('newMessage',generateMessage("Admin","New user joined"));
        callback("Done message sent")

    });
    socket.on('disconnect', function () {
        console.log("Disconnected from user")
    });
});


server.listen(port, () => {
    console.log(`App is running on ${port}...`)
})