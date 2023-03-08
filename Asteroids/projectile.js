class Projectile extends Actor {
  constructor(startingPosition, startingVelocity, radius, sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
    this.timeToLive = 2 * getFrameRate();
    this.birthFrame = frameCount;
  }

  update() {
    if (frameCount - this.birthFrame >= this.timeToLive) {
      this.destoryProjectile();
    }
    super.update();
  }

  display() {
    circle(this.position.x, this.position.y, this.radius);
  }

  destoryProjectile() {
    this.position = createVector(-100, -100);
    this.velocity = createVector(0, 0);
  }
}
