class Actor {
  constructor(startingPosition, startingVelocity, size, sprite, health) {
    this.position = startingPosition;
    this.velocity = startingVelocity;
    this.size = size;
    this.sprite = sprite;
    this.health = health;
  }

  update() {
    this.position.add(this.velocity);
    this.checkEdges();
  }

  isDead() {
    return this.health <= 0;
  }

  checkEdges() {
    let collisionRadius = this.size / 2;
    if (this.position.x > width - collisionRadius) {
      this.position.x = 0;
    } else if (this.position.x < collisionRadius) {
      this.position.x = width;
    }

    if (this.position.y > height - collisionRadius) {
      this.position.y = 0;
    } else if (this.position.y < collisionRadius) {
      this.position.y = height;
    }
  }

  display() {
    push();
        translate(this.position.x, this.position.y)
        let heading = atan2(this.velocity.y, this.velocity.x);
        rotate(heading);
        noFill();
        triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
    pop();
  }
}
