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
    this.score = 0;
    this.heading = heading;
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
      image(this.sprite, 0, 0, this.radius * 2, this.radius * 2);
      super.display();
    pop();
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  shoot() {}
}
