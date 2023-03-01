class Asteroid extends Actor {
    constructor(startingPosition, startingVelocity, radius, sprite, health) {
      super(startingPosition, startingVelocity, radius, sprite, health);
    }

    display() {
        strokeWeight(2);
        point(this.postion.x, this.position.y);
    }
}