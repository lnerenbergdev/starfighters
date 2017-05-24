function Planet(_x,_y,_r){
	this.location = {x:_x, y:_y};
	this.velocity = {x:0, y:0};
	this.accelleration = {x:0, y:0};

	this.force = {x:0, y:0};
	this.forces = [];

	this.r = _r;

	this.G = 9.8;

	this.mass = _r/2;
	this.terminalVelocity = 100;

	this.calculateAttraction = function(mover){

		var force = {x:0, y:0};

		force.x = mover.location.x - this.location.x;
		force.y = mover.location.y - this.location.y;

		var distance = Math.sqrt(Math.pow(force.x,2) + Math.pow(force.y,2));

		//console.log(distance);

		if(distance <= this.r + mover.r){
			distance = this.r + mover.r;
		} else if(distance >= 100){
			distance = 100;
		}

		force.x = force.x/ distance;
		force.y = force.y/ distance;

		var strength = (this.G * this.mass * mover.mass) / (Math.pow(distance,2));
		
		force.x *= strength;
		force.y *= strength;

		console.log(force);

		this.force = force;
		return force;
	};

	

	this.update = function(){
		this.accelleration.x = this.force.x / this.mass;
		this.accelleration.y = this.force.y / this.mass;

		this.velocity.x += this.accelleration.x;
		this.velocity.y += this.accelleration.y;

		this.location.x += this.velocity.x;
		this.location.y += this.velocity.y;
	};

	this.display = function(){
		ellipse(this.location.x, this.location.y, this.r);
	};
}