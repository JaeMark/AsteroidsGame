const AsteroidType = {
	Large: "large",
	Medium: "medium",
	Small: "small"
}

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

    add(type) {
        let startingPosition = createVector(random(0, width), random(0, height));
        let startingVelocity = p5.Vector.random2D();
        let size = 0;
        let sprite;
        switch (type) {
            case AsteroidType.Large:
                sprite = this.largeSprite;
                size = 60;
                break;
            case AsteroidType.Medium:
                sprite = this.mediumSprite;
                size = 30;
                break;
            case AsteroidType.Small:
                sprite = this.smallSprite;
                size = 15;
                break;
        }
        let asteroid = new Asteroid(startingPosition, startingVelocity, size, sprite);
        this.asteroids.push(asteroid);
    }

    getAsteroids() {
        return this.asteroids;
    }

    initialize() {
        for (let i = 0; i < this.numAsteroid; i++) {
            this.add(AsteroidType.Large);
        }
    }
}