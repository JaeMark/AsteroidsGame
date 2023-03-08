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
    image(this.sprite, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
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

   
  checkCollision(other) {
    return dist(this.position.x, this.position.y, 
                other.position.x, other.position.y) < 
           this.radius + other.radius;
  }
}
