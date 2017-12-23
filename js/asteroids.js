var asteroids = [];


class Asteroids{


	constructor(type){
    this.startingEnemyPositions  = [ vec2.create(Math.random()*canvas.width + 1,0),
                                 vec2.create(Math.random()*canvas.width + 1,canvas.height),
                                 vec2.create(0,Math.random()*canvas.height + 1),
                                 vec2.create(canvas.width,Math.random()*canvas.height + 1)];
    this.pos = this.startingEnemyPositions[Math.floor(Math.random()*4)];
    this.height = 19;
    this.width = 20;
    this.speed = 5;
    this.pic = enemyPic1;
		this.originalTilt = tilt;
    this.angle = Math.atan2(this.pos.y - canvas.height/2, this.pos.x - canvas.width/2);
    this.angle += Math.PI/2
    // this.velocity = vec2.create(5,5);

    this.velocity = vec2.create(-Math.cos(this.angle )* this.speed , Math.sin(this.angle + Math.PI/2)* this.speed);

		// this.bulletSpeed = 1;
		// this.bulletVelocity;
		// this.bulletWidth  = 2;
		// this.bulletHeight  = 2;
	}

	draw(){
        // console.log('hey')
        this.move();

        drawBitmapCenteredAtLocationWithRotation(this.pic, this.pos.x, this.pos.y ,this.angle);

  }


  move(){
      vec2.add(this.pos,this.pos,this.velocity);

  }

	shoot(){
		bullets.push(new Bullet(this.x,this.y,this.bulletSpeed,this.bulletWidth,this.bulletHeight,this.tilt));


	}



}
