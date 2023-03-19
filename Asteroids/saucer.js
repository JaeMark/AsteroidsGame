class Saucer extends Actor {
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
  
  update() {
    if(frameCount - this.nextFireFrame >= 0) {
      this.nextFireFrame += this.fireInterval;
      this.fire();
    }
    super.update();
  }
  
  fire() {
    let startingPosition = createVector(this.position.x, this.position.y);
    // aim at a random direction
    let startingVelocity = p5.Vector.random2D();
    startingVelocity.mult(5);
    let spriteSize = 7.5;
    let sprite = color("green"); 
    this.projectiles.push(
      new Projectile(startingPosition, startingVelocity, spriteSize, sprite)
    );
  }
  
  checkProjectileCollision(asteroidManager, player) {
    let asteroids = asteroidManager.asteroids;
    let saucers = saucerManager.saucers;
    for (let i = 0; i < this.projectiles.length; i++) {
      // break asteroids if this saucer's projectile collides with it
      for (let j = 0; j < asteroids.length; j++) {
        if (asteroids[j].checkCollision(this.projectiles[i])) {
          this.projectiles[i].destoryProjectile();
          asteroidManager.breakup(j);
          break;
        }
      }
      // damage player if this collides with it
      if (player.checkCollision(this.projectiles[i])) {
          this.projectiles[i].destoryProjectile();
          player.handleDamage();
      }
    }
  }
  
  displayProjectile() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].display();
    }
  }
  
  updateProjectile() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }
  }
}