let ship;
let numAsteroids = 3;
let playerProjectiles = [];
let asteroidManager;

let saucerManager;
let smallSaucerSpawnProb = 0.1;
let saucerSpawnInterval = 250;
let nextSaucerSpawnInterval = saucerSpawnInterval;

let playerSprite;
let explosionSprite;
let largeSprite;
let mediumSprite;
let smallSprite;
let enemySpriteSmall;
let enemySpriteLarge;

let startButton;
let restartButton;

function preload() {
  playerSprite = loadImage("assets/PlayerShip.png");
  explosionSprite = loadImage("assets/Explosion.png");
  largeSprite = loadImage("assets/AsteroidLarge.png");
  mediumSprite = loadImage("assets/AsteroidMedium.png");
  smallSprite = loadImage("assets/AsteroidSmall.png");
  enemySpriteSmall = loadImage("assets/EnemyShipSmall.png");
  enemySpriteLarge =  loadImage("assets/EnemyShipLarge.png");
}

const GameState = {
	Start: "start",
	Playing: "playing",
	GameOver: "gameover"
}
let gameState = GameState.Start;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  imageMode(CENTER);
  rectMode(CENTER);

  textStyle(BOLD);
  fill(255);
  textSize(20);
  
  // Setup the start button
  textAlign(CENTER);
  startButton = createButton("Start Game");
  startButton.size(200, 75);
  startButton.position(width/2-100, height/2-37.5);
  startButton.mousePressed(startGame);
  
    
  // Setup the restart button
  restartButton = createButton("Restart Game");
  restartButton.size(200, 75);
  restartButton.position(width/2-100, height/2-37.5);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
  
  newGame();
}

function draw() {
  background(220);

  switch (gameState) {
    case GameState.Start:  
      push();
        textAlign(CENTER);
        textSize(100);
        text("Asteroids", width/2, 225);
      pop();
      break;
    case GameState.Playing:
      playingGameStateUpdate();
      break;
    case GameState.GameOver:
      push();
        ship.display();
        image(explosionSprite, ship.position.x, ship.position.y, 100, 100);
        asteroidManager.display();
        background(220, 220, 220, 200);
        textAlign(CENTER);
        textSize(100);
        text("Game Over!", width/2, 225);
        restartButton.show();
      pop();
      break;
    default:
      console.log("Game mode: " + gameState + " not defined");
  } 
  
  displayScore();
  displayHealth();
  
}

// Starts the game
function startGame() {
  gameState = GameState.Playing;
  startButton.hide();
  ship.makeInvulnerable();
}  

// Starts the game
function restartGame() {
  newGame();
  gameState = GameState.Playing;
  restartButton.hide();
}  

function playingGameStateUpdate() {
  if(ship.isDead()) {
    gameState = GameState.GameOver;
    return;
  }
  
  let asteroids = asteroidManager.asteroids;
  let saucers = saucerManager.saucers;

  ship.checkProjectileCollision(asteroidManager, saucerManager);
  ship.displayProjectile();
  ship.updateProjectile();
  
  ship.checkCollisions(asteroids);
  ship.checkCollisions(saucers);
  ship.checkVulnerability();
  ship.display();
  ship.update();
  
  if(ship.score > nextSaucerSpawnInterval) {
    nextSaucerSpawnInterval += saucerSpawnInterval;
    saucerManager.spawnSaucer();
  }

  saucerManager.checkProjectileCollision(asteroidManager, ship);
  saucerManager.displayProjectile();
  saucerManager.updateProjectile();
  
  saucerManager.checkCollisions(asteroids);
  saucerManager.display();
  saucerManager.update();
  
  asteroidManager.display();
  asteroidManager.update();
}

function displayScore() {
  let scoreText = "Score: " + ship.score;
  push();
    textAlign(LEFT);
    text(scoreText, 20, 30);
  pop();
}

function displayHealth() {
  let scoreText = "Health: " + ship.health;
  push();
    textAlign(RIGHT);
    text(scoreText, width-20, 30);
  pop();
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
    ship.fire();
  }
  
  if (keyIsDown(83)) {
    // The 's' key is being pressed.
    ship.teleport();
  }

  if (keyIsDown(87)) {
    // The 'w' key is being pressed.
    ship.turnOnEngine(true);
  }
}

function newGame() {
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let heading = 0;
  let spriteSize = 20;
  let health = 5;
  ship = new Player(
    startingPosition,
    startingVelocity,
    heading,
    spriteSize,
    playerSprite,
    health
  );

  asteroidManager = new AsteroidManager(
    numAsteroids,
    largeSprite,
    mediumSprite,
    smallSprite
  );

  saucerManager = new SaucerManager(
    enemySpriteLarge,
    enemySpriteSmall,
    smallSaucerSpawnProb
  );
}

function keyReleased() {
  // stop ship rotation
  ship.setRotation(0);

  if (!keyIsDown(87)) {
    // turn off engine
    ship.turnOnEngine(false);
  }
}
