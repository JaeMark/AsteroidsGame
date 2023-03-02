class Asteroid extends Actor {
  constructor(startingPosition, startingVelocity, radius, sprite) {
    super(startingPosition, startingVelocity, radius, sprite);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    image(this.sprite, 0, 0, this.radius, this.radius);
    /*
    beginShape();
    for (let i = 0; i < 10; i++) {
      let angle = map(i, 0, 10, 0, TWO_PI);
      let x = this.radius * cos(angle);
      let y = this.radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    //ellipse(this.position.x, this.position.y, this.radius * 2);
    pop();
		this.checkEdges();
    */
    pop();
  }
}
