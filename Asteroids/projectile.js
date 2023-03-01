class Asteroid extends Actor {
    constructor(startingPosition, startingVelocity, radius, sprite) {
      super(startingPosition, startingVelocity, radius, sprite);
    }

    display() {
        strokeWeight(2);
        point(this.postion.x, this.position.y);
    }
}