function Ship() {
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

  this.id = 0;

  this.move = function() {
   
    if(this.turningLeft){
      this.heading += 0.1;
    } 
    
    if(this.turningRight){
      this.heading -= 0.1;
    }
    
    this.vel += this.acc; 
    
    if(this.vel > 5){
      this.vel = 5;
    }
    
    this.x += cos(this.heading) * this.vel;
    this.y += sin(this.heading) * this.vel;
    
    if(this.y > height){
      this.y = 0;
    }
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
    }
  };
  
  this.thrust = function(direction){
    switch(direction){
      case 0:
        this.acc = 0;
        break;
      case 1: 
        this.acc = .1;
        break;
      case 2:
        this.acc = -.1;
        break;
    }
  };



  this.setState = function(state){
  	this.x = state.x;
  	this.y = state.y;
  	this.heading = state.heading;
  };

  this.getState = function(){
  	var state = {
  		id: this.id,
  		x: this.x,
  		y: this.y,
  		heading: this.heading
  	};

  	return state;
  };

  this.display = function() {
    push();
    translate(this.x, this.y);
    rotate(this.heading);
    triangle(this.size, 0, -this.size, -this.size, -this.size, +this.size);
    fill(this.Color);
    pop();
  };
};