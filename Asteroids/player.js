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
    this.isEngineOn = false;
    this.extraHealthThreshold = 10000;
    this.nextScoreThreshold = this.extraHealthThreshold;
    this.isInvulnerable = false;
    this.invulnerabilityFrameStart = 0;
  }
  
  
  update() {
    if (this.isEngineOn) {
      this.thrust();
    }
    super.update();
    this.velocity.mult(0.97);
    if(this.isSpawning) {
      this.spawn();
    }
  } 
  
  updateScore(delta) {
    this.score += delta;
    // get an additional health every 1000 points
    if(this.score > this.nextScoreThreshold) {
      ++this.health;
      this.nextScoreThreshold += this.extraHealthThreshold;
    }
  }
  

  handleDamage() {
    if(!this.isInvulnerable) {
      --this.health;
      this.makeInvulnerable();
      this.position = createVector(width/2, height/2);
    }
  }
  
  setRotation(angle) {
    this.rotation = angle;
  }

  isDead() {
    return this.health <= 0;
  }

  turnOnEngine(isEngineSetToTurnOn) {
    this.isEngineOn = isEngineSetToTurnOn;
  }
  
  teleport() {
    this.position = createVector(random(0, width), random(0, height));
  }


  thrust() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  }

  display() {
    // make player sprite blink if they while in invulnerable state
    if(!this.isInvulnerable || (this.isInvulnerable && frameCount % 2 == 0)) {
      push();
        translate(this.position.x, this.position.y);
        this.heading += this.rotation;
        rotate(this.heading + PI / 2);
        translate(-this.position.x, -this.position.y);
        super.display();
      pop();
    }
  }
  
  makeInvulnerable() {
    this.isInvulnerable = true;
    this.invulnerabilityFrameStart = frameCount;
  }
  
  makeVulnerable() {
    this.isInvulnerable = false;
  }
  
  // manages the player vulnerability state
  checkVulnerability() {
    let invulnerabilityDuration = 120; // frames
    if(this.isInvulnerable && frameCount - this.invulnerabilityFrameStart > 
       invulnerabilityDuration) {
      this.makeVulnerable();
    }
  }
  
  fire() {
    let startingPosition = createVector(this.position.x, this.position.y);
    let startingVelocity = p5.Vector.fromAngle(this.heading);
    startingVelocity.mult(5);
    let spriteSize = 10;
    let sprite = color("orange");
    let projectile = new Projectile(startingPosition, startingVelocity, spriteSize, sprite);
    this.projectiles.push(projectile);
    
    if(!this.isEngineOn) {
      let force = p5.Vector.fromAngle(this.heading + PI);
      force.mult(0.75);
      this.velocity.add(force);
    }
  }
  
  checkCollisions(actors) {
    for (let i = 0; i < actors.length; i++) {
      if (this.checkCollision(actors[i])) {
        this.handleDamage();
      }
    }
  }
  
  checkProjectileCollision(asteroidManager, saucerManager) {
    let asteroids = asteroidManager.asteroids;
    let saucers = saucerManager.saucers;
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < asteroids.length; j++) {
        if (asteroids[j].checkCollision(this.projectiles[i])) {
          this.projectiles[i].destoryProjectile();
          this.updateScore(asteroidManager.getScore(j));
          asteroidManager.breakup(j);
          applyScreenShake();
          break;
        }
      }
      
      for (let j = 0; j < saucers.length; j++) {
        if (saucers[j].checkCollision(this.projectiles[i])) {
          this.projectiles[i].destoryProjectile();
          this.updateScore(saucerManager.getScore(j));
          saucerManager.destroySaucer(j);
          applyScreenShake();
          break;
        }
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
