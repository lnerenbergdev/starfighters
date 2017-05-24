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

var projectiles = {};

//Planet testing 
var testPlanet1;
var testPlanet2;

var path = [];

var frameCount = 0;

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
  testPlanet1 = new Planet(250,350,50);
  testPlanet2 = new Planet(450,350,50);
  // Start a socket connection to the server
  socket = io.connect('http://localhost:3000');

  // Initialize player ship
  players[myID] = new Ship(myID);
  path[0] = new Ship();

  socket.emit('initialize',0);

  // On socket initialization
  socket.on('init',
  	function(id){
      // Set id
      //console.log(players[myID]);
      console.log('init');

      delete players[myID];

  		myID = id;

      // Initialize new player
      players[myID] = new Ship();
      

      // Display that player
      //players[myID].display();  
  	}
  );

  socket.on('update',
    // on update recieved
    function(playerStates, projectileStates) {
      updatePlayers(playerStates);
      updateProjectiles(projectileStates);

      path[0] = players[myID];

      //console.log(projectileStates.length);
    }
  );
}

function updatePlayers(playerStates){
	for(var id in playerStates){
    //if(!player[id]){
		  players[id] = new Ship();
      players[id].setState(playerStates[id]);
    //}
	}
}


function updateProjectiles(projectileStates){
  for(var j in projectileStates){
    if(!projectiles[j]){
      projectiles[j] = new Projectile(projectileStates[j]);
      //console.log('hello');
    }
    projectiles[j].setState(projectileStates[j]);
    projectiles[j].display();
  }
  var remove = false;
  for(var j in projectiles){
    if(!projectileStates[j]){
      delete projectiles[j];
    }
  }
}

// Broadcast player state
function sendstate(players) {  
  if(myID != "temp"){
    socket.emit('updatePlayer', players[myID].getState());
  }
  return;
}


function draw() {
	background(20, 15, 0);

  testPlanet1.display();
  players[myID].calculateAttraction(testPlanet1);
  players[myID].update();


  //players[myID].display();

	for(var id in players){
		players[id].display();
	}

  for(var id in projectiles){
    projectiles[id].display();
  }

	sendstate(players);
  frameCount++;
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
  if(key != ' ' && key != 'UP_ARROW' && key != 'DOWN_ARROW'){
    players[myID].turn(0);
  }else if(key != ' '){
    players[myID].thrust(0);
  }
}

