class Character extends Actor {
    constructor(startingPosition, startingVelocity, size, sprite, health) {
      super(startingPosition, startingVelocity, size, sprite, health);
      this.maxSpeed = createVector(10, 10);
      this.acc = createVector(1, 1);
      this.isThrusting = false;
    }
    
    thrust() {
      this.isThrusting = true;
      //this.acc = createVector(10, 10);
    }
    
    update() {
      super.update();
     // this.velocity.add(this.acc);
      if(this.isThrusting) {
        this.velocity.add(this.acc);
        if(this.velocity == this.maxSpeed) {
          this.isThrusting = false;
          this.velocity = createVector(0, 0);
        }
      }
    }
    
    display() {
      super.display();
    }
    
    shoot() {
      
    }
  }