class Character extends Actor {
	constructor(startingPosition, startingVelocity, size, sprite, health) {
		super(startingPosition, startingVelocity, size, sprite, health);
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
			// direction of the velocity.
			if (keyIsPressed) {
				let noseLength = map(this.velocity.mag(), 0, 10, 0, this.size * 2);
				let direction = this.velocity.copy().setMag(noseLength);
				line(0, 0, direction.x, direction.y);
			}

			let heading = atan2(this.velocity.y, this.velocity.x);
			rotate(heading);
			super.display();
		pop();
	}
	
	shoot() {
		
	}
}