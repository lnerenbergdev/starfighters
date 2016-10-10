// ITP Networked Media, Fall 2014
// Thanks Daniel Shiffman for the Base Template 
// https://github.com/shiffman/itp-networked-media

// Built Upon by Lawson Nerenberg
// Fall 2016

// Keep track of our socket connection
var socket;

var myID = 'temp';
var players = {};

testPlayers = [];

var myPlayerIndex = 0;

var projectiles = [];

function State() {
	this.id = 0;
	this.x = 0;
	this.y = 0;
  this.vel = 0;
	this.heading = 0;
}

function setup() {
  createCanvas(700, 700);
  background(0);
  // Start a socket connection to the server
  socket = io.connect('http://localhost:3000');

  // Initialize player ship
  players[myID] = new Ship(myID);

  socket.emit('initialize',0);

  // On socket initialization
  socket.on('init',
  	function(id){
      // Set id
  		myID = id;

      // Initialize new player
      players[myID] = new Ship();

      // Display that player
      players[myID].display();  
  	}
  );

  socket.on('update',
    // on update recieved
    function(playerStates, projectileStates) {
      updatePlayers(playerStates);
      updateProjectiles(projectileStates);
      //console.log(projectileStates.length);
    }
  );

	for(var i = 0; i < 1; i++){
		testPlayers.push(new Ship());
	}


  testPlanet = new Planet(200,200);
}

function updatePlayers(playerStates){
  console.log(playerStates);
	for(var id in playerStates){
    //if(!player[id]){
		  players[id] = new Ship();
      players[id].setState(playerStates[id]);
    //}
	}
}


function updateProjectiles(projectileStates){
  for(var j in projectileStates){
    if(j >= projectiles.length){
      projectiles.push(new Projectile(projectileStates[j]));
      console.log('hello');
    }
    projectiles[j].setState(projectileStates[j]);
    projectiles[j].display();
  }
}

// Broadcast player state
function sendstate(players) {  
  socket.emit('updatePlayer', players[myID].getState());
  return;
}


function draw() {
	background(20, 15, 0);
  players[myID].move();

	for(var id in players){
		players[id].display();
	}

  for(var projectile of projectiles){
    projectile.display();
  }

  testPlanet.display();

	sendstate(players);
}


function Planet(x,y){
  this.x = x;
  this.y = y;

  this.mass = 50;

  this.d = Math.floor(Math.random() * 100);

  this.display = function(){
    ellipse(this.x,this.y,this.d,this.d);
  }
}


function handleProjectils(){
  //console.log(projectiles.length);
}


function keyPressed(){
  if(keyCode === LEFT_ARROW){
    players[myID].turn(2);
  }
  if(keyCode === RIGHT_ARROW){
    players[myID].turn(1);
  }

  if(keyCode === UP_ARROW){
    players[myID].thrust(1);
  }
  if(keyCode === DOWN_ARROW){
    players[myID].thrust(2);
  }

  if(keyCode === 32){
    socket.emit('fire',players[myID].getState());
    console.log('debug');
  }
}

function keyReleased(){
  if(keyCode != ' '){
    if(keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW){
      players[myID].thrust(0);
     
    }
    if(keyCode != UP_ARROW && keyCode != DOWN_ARROW){
      players[myID].turn(0);
    }
  }
}

