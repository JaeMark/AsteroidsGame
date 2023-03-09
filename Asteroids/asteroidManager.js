const AsteroidSize = {
  Large: 60,
  Medium: 30,
  Small: 15,
};

class AsteroidManager {
  constructor(startingNumAsteroid, largeSprite, mediumSprite, smallSprite) {
    this.numAsteroid = startingNumAsteroid;
    this.largeSprite = largeSprite;
    this.mediumSprite = mediumSprite;
    this.smallSprite = smallSprite;
    this.asteroids = [];
    this.spawnAsteroids(this.numAsteroid);
    this.lastAsteroidFrame = 0;
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
    if (this.asteroids.length == 0) {
      this.spawnNextLevel();
    }
  }

  spawnNextLevel() {
    this.numAsteroid = +2;
    this.spawnAsteroids(this.numAsteroid);
  }

  display() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].display();
    }
  }

  getScore(asteroidIndex) {
    let asteroidRadius = this.asteroids[asteroidIndex].radius;
    switch (asteroidRadius) {
      case AsteroidSize.Large:
        return 20;
      case AsteroidSize.Medium:
        return 50;
      case AsteroidSize.Small:
        return 100;
    }
    return 0;
  }

  breakup(asteroidIndex) {
    if (asteroidIndex < this.asteroids.length) {
      let asteroidRadius = this.asteroids[asteroidIndex].radius;
      let asteroidPosition = this.asteroids[asteroidIndex].position;
      let newAsteroid = [];
      switch (asteroidRadius) {
        case AsteroidSize.Large:
          this.addAsteroid(
            createVector(asteroidPosition.x, asteroidPosition.y),
            AsteroidSize.Medium
          );
          this.addAsteroid(
            createVector(asteroidPosition.x, asteroidPosition.y),
            AsteroidSize.Medium
          );
          break;
        case AsteroidSize.Medium:
          this.addAsteroid(
            createVector(asteroidPosition.x, asteroidPosition.y),
            AsteroidSize.Small
          );
          this.addAsteroid(
            createVector(asteroidPosition.x, asteroidPosition.y),
            AsteroidSize.Small
          );
          break;
        case AsteroidSize.Small:
          break;
      }
      this.asteroids.splice(asteroidIndex, 1);
    }
  }

  addAsteroid(startingPosition, asteroidSize) {
    let startingVelocity;
    let sprite;
    switch (asteroidSize) {
      case AsteroidSize.Large:
        startingVelocity = p5.Vector.random2D();
        sprite = this.largeSprite;
        break;
      case AsteroidSize.Medium:
        startingVelocity = p5.Vector.random2D();
        sprite = this.mediumSprite;
        break;
      case AsteroidSize.Small:
        startingVelocity = p5.Vector.random2D();
        sprite = this.smallSprite;
        break;
    }
    let asteroid = new Asteroid(
      startingPosition,
      startingVelocity,
      asteroidSize,
      sprite
    );
    this.asteroids.push(asteroid);
    this.lastAsteroidFrame = frameCount;
  }

  getAsteroids() {
    return this.asteroids;
  }

  spawnAsteroids(numToSpawn) {
    for (let i = 0; i < numToSpawn; i++) {
      this.addAsteroid(
        createVector(random(width), random(height)),
        AsteroidSize.Large
      );
    }
  }
}
