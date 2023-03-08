const SaucerSize = {
	Large: 50,
	Small: 40
}

class SaucerManager {
  constructor(largeSprite, smallSprite, smallSaucerSpawnRate) {
    this.largeSprite = largeSprite;
    this.smallSprite = smallSprite;
    this.smallSaucerSpawnRate = smallSaucerSpawnRate;
    this.saucers = [];
  }
  
  spawnSaucer() {
    let size = SaucerSize.Large;
    let randomNum = random();
    if(randomNum < this.smallSaucerSpawnRate) {
      size = SaucerSize.Small;
    }
    
    let spawnLocation = createVector(random(width), random(height));
    
    switch (size) {
      case SaucerSize.Large:
         this.saucers.push(new Saucer(
                      spawnLocation, 
                      p5.Vector.random2D(),
                      size,
                      this.largeSprite));
        break;
      case SaucerSize.Small:
         this.saucers.push(new Saucer(
                      spawnLocation, 
                      p5.Vector.random2D(),
                      size,
                      this.smallSprite));
      break;
    }
  }
  
  display() {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].display();
    }
  }
  
  update() {
    for (let i = 0; i < this.saucers.length; i++) {
        this.saucers[i].update();
    }
  }
}
                    