let ship;
let asteroids = [];
let numAsteroids = 5;

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

  for (let i = 0; i < numAsteroids; i++) {
    startingPosition = createVector(random(0, width), random(0, height));
    spriteSize = 10;
    asteroids.push(
      new Asteroid(
        startingPosition,
        startingVelocity,
        spriteSize,
        sprite,
        health
      )
    );
  }
}

function draw() {
  background(220);

  ship.display();
  ship.update();

  for (const asteroid of asteroids) {
    asteroid.display();
    //asteroid.update();
  }
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
