let ship;
let numAsteroids = 5;
let playerProjectiles = [];
let asteroidManager;

function setup() {
  createCanvas(400, 400);

  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let heading = 0;
  let spriteSize = 5;
  let sprite = 10;
  let health = 5;
  ship = new Character(
    startingPosition,
    startingVelocity,
    heading,
    spriteSize,
    sprite,
    health
  );

  asteroidManager = new AsteroidManager(numAsteroids);
}

function draw() {
  background(220);

  for (let i = 0; i < playerProjectiles.length; i++) {
    playerProjectiles[i].display();
    playerProjectiles[i].update();
  }

  ship.display();
  ship.update();

  asteroidManager.display();
  asteroidManager.update();

}

function fire() {
  let startingPosition = createVector(ship.position.x, ship.position.y);
  let startingVelocity = p5.Vector.fromAngle(ship.heading);
  startingVelocity.mult(5);
  let spriteSize = 2;
  let sprite = 10;
  playerProjectiles.push(
    new Projectile(startingPosition, startingVelocity, spriteSize, sprite)
  );
}

function keyPressed() {
  if (keyIsDown(65)) {
    // The 'a' key is being pressed.
    // rotate counter-clockwise
    ship.setRotation(-0.1);
  }
  if (keyIsDown(68)) {
    // The 'd' key is being pressed.
    // rotate clockwise
    ship.setRotation(0.1);
  }

  if (keyIsDown(32)) {
    // The space key is being pressed.
    fire();
  }

  if (keyIsDown(87)) {
    // The 'w' key is being pressed.
    ship.turnOnEngine(true);
  }
}

function keyReleased() {
  // stop ship rotation
  ship.setRotation(0);

  if (!keyIsDown(87)) {
    // turn off engine
    ship.turnOnEngine(false);
  }
}
