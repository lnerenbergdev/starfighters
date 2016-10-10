
// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, 'localhost', listen);

function State() {
	this.x = 0;
	this.y = 0;
	this.heading = 0;
}

var playerStates = {};
var projectileStates = [];
var playerIDs = [];

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);
var now = new Date();

var playerCount = 0;
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
    

    console.log("We have a new client: " + socket.id);
    
    socket.on('initialize',
    	function(){
    		
    		io.to(socket.id).emit('init', socket.id);
        io.to(socket.id).emit('update', playerStates, projectileStates);
    	}
    );

    // Client side: socket.emit('event', data);
    // Secound argument is executed function
    socket.on('updatePlayer',
      function(playerState) {
   		playerStates[playerState.id] = playerState;

      //console.log(playerState);


   		socket.broadcast.emit('update', playerStates, projectileStates);
        // To send to everyone including sender use:
        // io.sockets.emit('message', "this goes to everyone");
      }
    );

    socket.on('disconnect', function() {
      playerCount--;

      if(playerStates[socket.id]){
        delete playerStates[socket.id];
      }    
    });


    socket.on('fire', function(playerState){
      var projectileState = {
        x: playerState.x,
        y: playerState.y,
        vel: 5,
        heading: playerState.heading
      }
   
      projectileStates.push(projectileState);
    });
  }
);

var INTERVAL = 30;

function mainLoop(){
  for(var i in projectileStates){
    projectileStates[i].x += Math.cos(projectileStates[i].heading) * projectileStates[i].vel;
    projectileStates[i].y += Math.sin(projectileStates[i].heading) * projectileStates[i].vel;
  }
}

setInterval(function(){
  mainLoop();

}, INTERVAL);




























