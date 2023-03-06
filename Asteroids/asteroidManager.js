const AsteroidType = {
  Large: "large",
  Medium: "medium",
  Small: "small",
};

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
    this.initialize();
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }

  display() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].display();
    }
  }

  breakup(asteroidIndex) {
    if (asteroidIndex < this.asteroids.length) {
      let asteroidRadius = this.asteroids[asteroidIndex].radius;
      let asteroidPosition = this.asteroids[asteroidIndex].position;
      switch (asteroidRadius) {
        case AsteroidSize.Large:
          this.asteroids.push(
            new Asteroid(
              createVector(asteroidPosition.x, asteroidPosition.y),
              p5.Vector.random2D(),
              AsteroidSize.Medium,
              this.mediumSprite
            )
          );
          this.asteroids.push(
            new Asteroid(
              createVector(asteroidPosition.x, asteroidPosition.y),
              p5.Vector.random2D(),
              AsteroidSize.Medium,
              this.mediumSprite
            )
          );
          break;
        case AsteroidSize.Medium:
          this.asteroids.push(
            new Asteroid(
              createVector(asteroidPosition.x, asteroidPosition.y),
              p5.Vector.random2D(),
              AsteroidSize.Small,
              this.smallSprite
            )
          );
          this.asteroids.push(
            new Asteroid(
              createVector(asteroidPosition.x, asteroidPosition.y),
              p5.Vector.random2D(),
              AsteroidSize.Small,
              this.smallSprite
            )
          );
          break;
        case AsteroidSize.Small:
          break;
      }
      this.asteroids.splice(asteroidIndex, 1);
    }
  }

  add(asteroidSize) {
    let startingPosition = createVector(random(0, width), random(0, height));
    let startingVelocity = p5.Vector.random2D();
    let sprite;
    switch (asteroidSize) {
      case AsteroidSize.Large:
        sprite = this.largeSprite;
        break;
      case AsteroidSize.Medium:
        sprite = this.mediumSprite;
        break;
      case AsteroidSize.Small:
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
  }

  getAsteroids() {
    return this.asteroids;
  }

  initialize() {
    for (let i = 0; i < this.numAsteroid; i++) {
      this.add(AsteroidSize.Large);
    }
  }
}
