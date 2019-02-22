var socket = io();
socket.on('connect', function () {
    console.log("connected to server")
});
socket.on('disconnect', function () {
    console.log("Disconnected from server")
});
socket.on('newMessage', (message) => {
    console.log("Message found ", message)
});
socket.emit('createMessage', {
    email: "Helloworld@gmail.com",
    name: "My name is vijender",
    message: "Heelllooo world"
});