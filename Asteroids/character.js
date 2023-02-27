class Character extends Actor {
  constructor(
    startingPosition,
    startingVelocity,
    heading,
    size,
    sprite,
    health
  ) {
    super(startingPosition, startingVelocity, size, sprite, health);
    this.heading = heading;
    this.rotation = 0;
    this.maxSpeed = createVector(10, 10);
    this.acc = createVector(1, 1);
  }

  thrust() {
    let force = p5.Vector.fromAngle(this.heading);
    this.velocity.add(force);
  }

  update() {
    super.update();
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
    rotate(this.heading + PI/2);
    super.display();
    pop();
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  shoot() {}
}
