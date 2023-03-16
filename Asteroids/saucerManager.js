const SaucerSize = {
	Large: 25,
	Small: 15
}

class SaucerManager {
  constructor(largeSprite, smallSprite, smallSaucerSpawnRate) {
    this.largeSprite = largeSprite;
    this.smallSprite = smallSprite;
    this.smallSaucerSpawnRate = smallSaucerSpawnRate;
    this.saucers = [];
    // for small saucers only
    this.aimOffset = PI/8;
    this.aimUpgradeRequirement = 1000;
    this.nextAimUpgradeThreshold = this.aimUpgradeRequirement;
  }
  
  spawnSaucer() {
    let size = SaucerSize.Large;
    let randomNum = random();
    if(randomNum < this.smallSaucerSpawnRate) {
      size = SaucerSize.Small;
    }
    // spawn at the boundary
    let spawnLocation = createVector(floor(random(2) * width, 
                                     floor(random(2) * height)));
    switch (size) {
      case SaucerSize.Large:
         this.saucers.push(new Saucer(
                      spawnLocation, 
                      p5.Vector.random2D(),
                      size,
                      this.largeSprite));
        break;
      case SaucerSize.Small:
         this.saucers.push(new SmallSaucer(
                      spawnLocation, 
                      p5.Vector.random2D(),
                      size,
                      this.smallSprite));
      break;
    }
  }
  
  upgradeAim(score) {
     if(this.nextAimUpgradeThreshold - score <= 0) {
       this.nextAimUpgradeThreshold += this.aimUpgradeRequirement;
       // decrease aim offset by 10% every 1000 points
       this.aimOffset *= 0.9;
     }
  }  
  
  display() {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].display();
    }
  }
  
  update(targetActor, score) {
    for (let i = 0; i < this.saucers.length; i++) {
      if(this.saucers[i].radius == SaucerSize.Small) {
        this.upgradeAim(score);
        this.saucers[i].update(targetActor, this.aimOffset);
      } else {
        this.saucers[i].update();
      }
    }
  }
  
  destroySaucer(index) {
    this.saucers.splice(index, 1);
  }
  
  destroyAllSaucers() {
    this.saucers = [];
  }
  
  getScore(index) {
    let saucerSize = this.saucers[index].radius;
    switch (saucerSize) {
        case SaucerSize.Large:
            return 200;
        case SaucerSize.Small:
            return 1000;
    }
    return 0;
  }
  
  checkCollisions(actors) {
    for (let i = 0; i < actors.length; i++) {
      for(let j = 0; j < this.saucers.length; j++) {
        if (this.saucers[j].checkCollision(actors[i])) {
          this.destroySaucer(j);
          break;
        }
      }
    }
  }
  
  checkProjectileCollision(asteroidManager, player) {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].checkProjectileCollision(asteroidManager, player);
    }
  }
  
  displayProjectile() {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].displayProjectile();
    }
  }
  
  updateProjectile() {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].updateProjectile();
    }
  }
}
                    