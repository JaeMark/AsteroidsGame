const AsteroidType = {
	Large: "large",
	Medium: "medium",
	Small: "small"
}

class AsteroidManager {
    constructor(startingNumAsteroid) {
        this.numAsteroid = startingNumAsteroid;
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
                sprite = loadImage("assets/AsteroidLarge.png");
                size = 20;
                break;
            case AsteroidType.Medium:
                sprite = loadImage("assets/AsteroidMedium.png");
                size = 15;
                break;
            case AsteroidType.Small:
                sprite = loadImage("assets/AsteroidSmall.png");
                size = 10;
                break;
        }
        let asteroid = new Asteroid(startingPosition, startingVelocity, size, sprite);
        this.asteroids.push(asteroid);
    }

    initialize() {
        for (let i = 0; i < this.numAsteroid; i++) {
            this.add(AsteroidType.Large);
        }
    }
    
}