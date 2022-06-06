const express = require("express")
const app = express()
const http = require('http')
const expressServer = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(expressServer)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


io.on('connection', (socket) => {
    console.log('User Connected');

    // recive chat
    socket.on('chat', (data) => {
        io.emit('chatShow', data)

    })

    socket.on('disconnect', () => {
        console.log("User DisConneced");
    })
})





// 
expressServer.listen(port, () => {
    console.log('Server Running');
})