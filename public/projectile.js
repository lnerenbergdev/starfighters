function Projectile(originState) {
  this.x = originState.x;
  this.y = originState.y;
  this.vel = originState.vel;
  this.heading = originState.heading;

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
      vel: this.vel,
  		heading: this.heading
  	};

  	return state;
  }

  this.setState = function(state){
  	console.log(state);
  	this.x = state.x;
  	this.y = state.y;
    this.vel = state.vel;
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