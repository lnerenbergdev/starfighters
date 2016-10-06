// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;

var myShip;
var players = [];
testPlayers = [];

var myPlayerIndex = 0;

var myProjectiles = [];
var projectiles = [myProjectiles];

function State() {
	this.id = 0;
	this.x = 0;
	this.y = 0;
	this.heading = 0;
}

function setup() {
  createCanvas(700, 700);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function

  myShip = new Ship();
  myProjectiles[0] = new Projectile(myShip.x, myShip.y, myShip.heading);

  socket.emit('initialize',0);

  socket.on('init',
  	function(id){
  		myShip.id = id;  
  		console.log(id);
  	}
  );

  socket.on('update',
    // When we receive data
    function(playerStates, projectileStates) {
    
     
      // Draw a blue circle
      updatePlayers(playerStates);
      updateProjectiles(projectileStates);
      console.log(projectileStates.length);

    }
  );

	for(var i = 0; i < 1; i++){
		testPlayers.push(new Ship());
	}
}

function updatePlayers(playerStates){
	if(playerStates.length > players.length){
		for(var p in playerStates){
			if(p >= players.length){
				players.push(new Ship());
			}
		}
	}

	for(var p in playerStates){
    if(playerStates[p]){
		  players[p].setState(playerStates[p]);
    }
	}
}

function updateProjectiles(projectileStates){
  for(var j in projectileStates){
    for(var k in projectileStates[j]){
      if(j >= projectiles.length){
        projectiles[j] = [];
        projectiles[j].push(new Projectile( projectileStates[j][k].x, projectileStates[j][k].y, projectileStates[j][k].heading ));
      } else if(projectiles[j] && k >= projectiles[j].length){
        projectiles[j].push(new Projectile( projectileStates[j][k].x, projectileStates[j][k].y, projectileStates[j][k].heading ));
      } else {
        projectiles[j][k].setState(projectileStates[j][k]);
      }
    }
  }
}

// Sending to the socket
function sendstate(myShip) {  
  // Make object containing player state

  // Send that object to the socket
  socket.emit('updatePlayer', myShip.getState(), myProjectileStates());
  return;
}

function myProjectileStates(){
  this.id = myShip.id; 

  projectileStates = [];
  for(var projectile of myProjectiles){
    projectileStates.push(projectile.getState());
  }
  return projectileStates;
}

function draw() {
  // Nothing

	background(20, 15, 0);
	myShip.move();
	myShip.display();

	for(var player of players){
		player.display();
	}

	sendstate(myShip);

  handleProjectils();
  
}

function handleProjectils(){
  var inBounds =[];
  //Local Projectile Handling 
  if(myProjectiles.length > 0){
    for(var p in myProjectiles){

      myProjectiles[p].move();
      myProjectiles[p].display();

      if(myProjectiles[p].isInWindow(700,700)){
        inBounds.push(myProjectiles[p]);
      }
    }
  }
  for(var i = 0; i < myProjectiles.length; i++){
    if(i < inBounds.length){
      myProjectiles[i] = inBounds[i];
    } else {
      myProjectiles.pop();
    }
  }

  for(var j in projectiles){
    for(var k in projectiles[j]){
      
      projectiles[j][k].display();
      
    }
  }
  //console.log(projectiles.length);
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    myShip.turn(2);
  }
  if(keyCode === RIGHT_ARROW){
    myShip.turn(1);
  }

  if(keyCode === UP_ARROW){
    myShip.thrust(1);
  }
  if(keyCode === DOWN_ARROW){
    myShip.thrust(2);
  }

  if(keyCode === 32){
    myProjectiles[myProjectiles.length] = new Projectile(myShip.x, myShip.y, myShip.heading);
    
    console.log('debug');
  }
}

function keyReleased(){
  if(keyCode != ' '){
    if(keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW){
      myShip.thrust(0);
     
    }
    if(keyCode != UP_ARROW && keyCode != DOWN_ARROW){
      myShip.turn(0);
    }
  }
}

