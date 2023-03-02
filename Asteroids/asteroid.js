class Asteroid extends Actor {
  constructor(startingPosition, startingVelocity, radius, sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
  }

  display() {
    push();
      translate(this.position.x, this.position.y);
      image(this.sprite, 0, 0, this.radius, this.radius);
    pop();
  }
}
