let ship;

function setup() {
  createCanvas(400, 400);
  
  let startingPosition = createVector(width/2, height/2);
  let startingVelocity = createVector(0, 0);
  let spriteSize = 5;
  let sprite = 5;
  let health = 5;
  ship = new Character(startingPosition, startingVelocity, spriteSize, sprite, health);
  
}

function draw() {
  background(220);
  
  if(mouseIsPressed) {
    ship.thrust();
  }
  
  ship.display();
  ship.update();
  
}
