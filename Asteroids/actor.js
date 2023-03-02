class Actor {
  constructor(startingPosition, startingVelocity, radius, sprite, health) {
    this.position = startingPosition;
    this.velocity = startingVelocity;
    this.radius = radius;
    this.sprite = sprite;
  }

  update() {
    this.position.add(this.velocity);
    this.checkEdges();
  }

  display() {
    push();
			noFill();
			triangle(
				-this.radius,
				this.radius,
				0,
				-this.radius,
				this.radius,
				this.radius
			);
    pop();
  }

  checkEdges() {
    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    } else if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }

    if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
    } else if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
    }
  }
}
