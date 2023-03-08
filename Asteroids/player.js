class Player extends Actor {
  constructor(
    startingPosition,
    startingVelocity,
    heading,
    radius,
    sprite,
    health
  ) {
    super(startingPosition, startingVelocity, radius, sprite);
    this.health = health;
    this.heading = heading;
    this.projectiles = [];
    this.score = 0;
    this.rotation = 0;
    this.isEngineOne = false;
    this.extraHealthThreshold = 10000;
    this.nextScoreThreshold = this.extraHealthThreshold;
  }

  isDead() {
    return this.health <= 0;
  }

  turnOnEngine(isEngineSetToTurnOn) {
    this.isEngineOn = isEngineSetToTurnOn;
  }

  thrust() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  }

  update() {
    if (this.isEngineOn) {
      this.thrust();
    }
    super.update();
    this.velocity.mult(0.97);
  }
  
  updateScore(delta) {
    this.score += delta;
    if(this.score > this.nextScoreThreshold) {
      ++this.health;
      this.nextScoreThreshold += this.extraHealthThreshold;
    }
  }
  
  teleport() {
    this.position = (createVector(random(0, width), random(0, height)));
  }

  respawn() {
    --this.health;
    if(!this.isDead()) {
      this.position = createVector(width / 2, height / 2);
    }
  }

  display() {
    push();
      translate(this.position.x, this.position.y);
      this.heading += this.rotation;
      rotate(this.heading + PI / 2);
      translate(-this.position.x, -this.position.y);
      super.display();
    pop();
  }

  setRotation(angle) {
    this.rotation = angle;
  }
  
  fire() {
    let startingPosition = createVector(this.position.x, this.position.y);
    let startingVelocity = p5.Vector.fromAngle(this.heading);
    startingVelocity.mult(5);
    let spriteSize = 7.5;
    let sprite = 10;
    this.projectiles.push(
      new Projectile(startingPosition, startingVelocity, spriteSize, sprite)
    );
  }
  
  checkProjectileCollision(asteroidManager) {
    let asteroids = asteroidManager.getAsteroids();
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].display();
      this.projectiles[i].update();
      for (let j = 0; j < asteroids.length; j++) {
        if (asteroids[j].checkCollision(this.projectiles[i])) {
          this.projectiles[i].destoryProjectile();
          this.updateScore(asteroidManager.getScore(j));
          asteroidManager.breakup(j);
          break;
        }
      }
    }
  }

  shoot() {}
}
