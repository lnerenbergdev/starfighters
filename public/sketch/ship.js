function Ship(id) {

  this.location = {x:400, y:350};
  this.velocity = {x:0, y:2};
  this.accelleration = {x:0, y:0};

  this.force = {x:0, y:0};

  this.mass = 1;

  this.G = 9.8;

  this.x = random(width);
  this.y = random(height);
  this.vel = 0;
  this.acc = 0;
  this.heading = 0;
  
  this.size = 10;
  this.speed = random(1,5);
  this.Color = color(random(255),random(255),random(255));
  
  this.turningLeft = false;
  this.turningRight = false;

  this.id = id;

  this.calculateAttraction = function(mover){

    var force = {x:0, y:0};

    force.x = mover.location.x - this.location.x;
    force.y = mover.location.y - this.location.y;

    var distance = Math.sqrt(Math.pow(force.x,2) + Math.pow(force.y,2));

    //console.log(distance);

    if(distance <= this.size + mover.r){
      distance = this.size + mover.r;
    } else if(distance >= 100){
      distance = 100;
    }

    force.x = force.x/ distance;
    force.y = force.y/ distance;

    var strength = (this.G * this.mass * mover.mass) / (Math.pow(distance,2));
    
    force.x *= strength;
    force.y *= strength;


    //console.log(force);

    this.force = force;
    return force;
  };

  this.update = function(bodie) {

    this.accelleration.x += this.force.x / this.mass;
    this.accelleration.y += this.force.y / this.mass;

    this.velocity.x += this.accelleration.x;
    this.velocity.y += this.accelleration.y;

    this.location.x += this.velocity.x;
    this.location.y += this.velocity.y;

    // Old movment
    if(this.turningLeft){
      this.heading += 0.1;
    } 
    
    if(this.turningRight){
      this.heading -= 0.1;
    }
    
    this.accelleration.x = 0;
    this.accelleration.y = 0;
    // this.vel += this.acc; 
    
    // if(this.vel > 5){
    //   this.vel = 5;
    // }
    
    // this.x += cos(this.heading) * this.vel;
    // this.y += sin(this.heading) * this.vel;
    
    // if(this.y > height){
    //   this.y = 0;
    // }
  };
  
  this.turn = function(direction){
    switch(direction){
      case 1:
        this.turningLeft = true;
        break;
      case 2:
        this.turningRight = true;
        break;
      case 0:
        this.turningLeft = false;
        this.turningRight = false;
        break;
    }
  };
  
  this.thrust = function(direction){
    
    switch(direction){
      case 0:
        this.accelleration.x = 0;
        this.accelleration.y = 0;
        break;
      case 1: 
        console.log('lel');
        this.accelleration.x = cos(this.heading);
        this.accelleration.y = sin(this.heading);
        break;
      case 2:
        this.accelleration.x = -cos(this.heading);
        this.accelleration.y = -sin(this.heading);
        break;
    }
  };

  this.setState = function(state){
    this.location = state.location;
    this.velocity = state.velocity;
    this.accelleration = state.accelleration;
  	this.heading = state.heading;
  };

  this.getState = function(){
  	var state = {
  		id: this.id,
  		location: this.location,
      velocity: this.velocity,
      accelleration: this.accelleration,
  		heading: this.heading
  	};

  	return state;
  };

  this.display = function() {
    push();
    translate(this.location.x, this.location.y);
    rotate(this.heading);
    triangle(this.size, 0, -this.size, -this.size, -this.size, +this.size);
    fill(this.Color);
    pop();
  };
}