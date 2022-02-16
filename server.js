const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
   res.render('index');
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});


io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('StreamEvent', (frame) => {
        const image = frame.toString();
        io.emit('image', image);
    })
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
});

