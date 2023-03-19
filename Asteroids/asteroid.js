class Asteroid extends Actor {
  constructor(startingPosition, startingVelocity, radius, sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
  }

  display() {
    push();
      super.display();
    pop();
  }
}
