var client_sockets = [];

var http_server = require('http').createServer(function (request, response) {
   response.writeHead(200, {
      'Content-Type': 'text/plain'
   });

   var parsed_url = require('url').parse(request.url);

   var qs = parsed_url.query;
   console.log('querystring is : ' + qs);

   if (qs != 'undefined') {
      var obj_qs = require('querystring').parse(qs);
      var log_message = obj_qs.log_message;
      console.log('  --> log_message : ' + log_message);
      if (client_sockets.length) {
         client_sockets.forEach(function(client_socket){
            client_socket.emit('log_message', log_message);
         });
      }

   }
   else {
      console.log('  --> log_message : EMPTY !');
   }

   response.end();
});

http_server.listen(8080);

// note, io.listen(<port>) will create a http server for you
//var io = require('socket.io').listen(8080);

var io = require('socket.io').listen(http_server);

io.sockets.on('connection', function (client) {
   console.log('Welcome on log_messages : connection accepted from client ' + client.sessionId);
   client_sockets.push(client);
   client.on('message', function (message) {
      //console.log('Received message : ' + message + ' - from client ' + client.sessionId);
      //client.emit('log_message', data);
   });

   client.on('disconnect', function() {
      var pos = client_sockets.indexOf(client);
      if (pos >= 0) {
         client_sockets.splice(pos, 1);
      }
      console.log("Client " + client.sessionId + " is disconnected.");
   });

//   client.on('ack_log_message', function (data) {
//      console.log(data)
//   });
});
