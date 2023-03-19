class SmallSaucer extends Saucer {
  constructor(
    startingPosition,
    startingVelocity,
    radius,
    sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
    this.projectiles = [];
    this.fireInterval = 2 * getFrameRate();
    this.nextFireFrame = frameCount + this.fireInterval;
  }
  
  update(targetActor, aimOffSet) {
    if(frameCount - this.nextFireFrame >= 0) {
      this.nextFireFrame += this.fireInterval;
      this.fire(targetActor, aimOffSet);
    }
    super.update();
  }
  
  fire(targetActor, aimOffset) {
    let startingPosition = createVector(this.position.x, this.position.y);
    // get angle between self and target, then add aim offset to the angle
    let angle = atan2(targetActor.position.y - this.position.y, 
                      targetActor.position.x - this.position.x) + 
                random(-aimOffset, aimOffset);
    let startingVelocity = p5.Vector.fromAngle(angle);
    startingVelocity.mult(5);
    let spriteSize = 10;
    let sprite = color("green"); 
    this.projectiles.push(
      new Projectile(startingPosition, startingVelocity, spriteSize, sprite)
    );
  }
}