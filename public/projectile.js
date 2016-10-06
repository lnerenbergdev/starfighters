function Projectile(x,y,heading) {
  this.x = x;
  this.y = y;
  this.vel = 1;
  this.heading = heading;

  this.move = function() {
    
    this.x += cos(this.heading) * this.vel;
    this.y += sin(this.heading) * this.vel;
    
  };

  this.display = function() {
    
  	stroke(255);
    line(this.x,this.y,this.x - cos(this.heading) * 5, this.y - sin(this.heading) * 5);
    
  };

  this.getState = function(){
  	var state = {
  		x: this.x,
  		y: this.y,
  		heading: this.heading
  	};

  	return state;
  }

  this.setState = function(state){
  	console.log(state);
  	this.x = state.x;
  	this.y = state.y;
  	this.heading = state.heading;
  }

  this.isInWindow = function(sizeX,sizeY){
  	if(this.x > sizeX || this.x < 0 || this.y > sizeY || this.y < 0){
  		return false;
  	} else {
  		return true;
  	}
  };
  
};