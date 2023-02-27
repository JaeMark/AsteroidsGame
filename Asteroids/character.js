class Character extends Actor {
	constructor(startingPosition, startingVelocity, heading, size, sprite, health) {
		super(startingPosition, startingVelocity, size, sprite, health);
		this.heading = heading;
		this.rotation = 0;
		this.maxSpeed = createVector(10, 10);
		this.acc = createVector(1, 1);
		this.isThrusting = false;
	}
	
	thrust() {
		this.isThrusting = true;
		//this.acc = createVector(10, 10);
	}
	
	update() {
		super.update();
		// this.velocity.add(this.acc);
		if(this.isThrusting) {
			this.velocity.add(this.acc);
			if(this.velocity == this.maxSpeed) {
				this.isThrusting = false;
				this.velocity = createVector(0, 0);
			}
		}
	}

	display() {
		push();
			translate(this.position.x, this.position.y);
			/*
			// direction of the velocity.
			if (keyIsPressed) {
				let noseLength = map(this.velocity.mag(), 0, 10, 0, this.size * 2);
				let direction = this.velocity.copy().setMag(noseLength);
				line(0, 0, direction.x, direction.y);
			}
			*/
			this.heading += this.rotation;
			rotate(this.heading);
			super.display();
		pop();
	}
	
	setRotation(angle) {
		this.rotation = angle;
	}

	shoot() {
		
	}
}