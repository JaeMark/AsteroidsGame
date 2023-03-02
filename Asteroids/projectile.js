class Projectile extends Actor {
  constructor(startingPosition, startingVelocity, radius, sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
  }

  display() {
    push();
      circle(this.position.x, this.position.y, this.radius);
    pop();
  }
}