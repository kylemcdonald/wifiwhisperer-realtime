var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use('/', express.static('.'));

function getQuery(req) {
	return req.url.split('?').slice(1).join();
}

app.get('/add', function (req, res) {
	res.end();
	var query = getQuery(req);
	console.log(query);
	io.emit('add', query);
});

io.on('connection', function (socket) {
  socket.emit('hello', { from: 'backend' });
  socket.on('hello', function (data) {
    console.log(data);
  });
});