let ship;

function setup() {
  createCanvas(400, 400);

  let startingPosition = createVector(width/2, height/2);
  let startingVelocity = createVector(0, 0);
  let spriteSize = 5;
  let sprite = 10;
  let health = 5;
  ship = new Character(startingPosition, startingVelocity, spriteSize, sprite, health);

}

function draw() {
  background(220);

  ship.display();
  ship.update();
  
}

function keyPressed() {
  if (keyIsDown(65)) { // The 'a' key is being pressed. 
    // rotate counter-clockwise 
  } 
  if (keyIsDown(68)) { // The 'd' key is being pressed. 
    // rotate clockwise 
  }

  if (keyIsDown(87)) { // The 'w' key is being pressed. 
    ship.thrust();
  } else { 
    // Turn off engine. 
  }
}