class Actor {
  constructor(startingPosition, startingVelocity, radius, sprite, health) {
    this.position = startingPosition;
    this.velocity = startingVelocity;
    this.radius = radius;
    this.sprite = sprite;
    this.health = health;
  }

  update() {
    this.position.add(this.velocity);
  }

  isDead() {
    return this.health <= 0;
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
}
