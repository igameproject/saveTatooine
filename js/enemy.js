var enemies = [];


class Enemy{


	constructor(type){
    this.startingEnemyPositions  = [ vec2.create(Math.random()*canvas.width + 1,0),
                                     vec2.create(Math.random()*canvas.width + 1,canvas.height),
                                     vec2.create(0,Math.random()*canvas.height + 1),
                                     vec2.create(canvas.width,Math.random()*canvas.height + 1)];

    this.pos = this.startingEnemyPositions[Math.floor(Math.random()*4)];
    this.height = 19;
    this.width = 20;
    this.speed = 2;
    this.pic = enemyPic1;
    this.angle = Math.atan2(this.pos.y - canvas.height/2, this.pos.x - canvas.width/2);
    this.angle += Math.PI/2
    this.halfway = false;
    // this.velocity = vec2.create(5,5);
    this.remove = false;
    this.velocity = vec2.create(Math.cos(this.angle + Math.PI/2)* this.speed , Math.sin(this.angle + Math.PI/2)* this.speed);
		this.bulletSpeed = 6;
		this.bulletWidth  = 5;
		this.bulletHeight  = 10;
    this.bulletPic = EnemyShotPic;
		this.bulletType = "enemy";
		this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.angle);

	}

	draw(){
        this.move();
        drawBitmapCenteredAtLocationWithRotation(this.pic, this.pos.x, this.pos.y ,this.angle);
  }

  move(){
      vec2.add(this.pos,this.pos,this.velocity);
			this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.angle + 0.145);
      if(this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > canvas.height){
      		this.remove = true;
      }
			var distanceEnemyPlanetCenter;
			// console.log(distanceEnemyPlanetCenter);
			//  console.log(Math.pow((planetDia/2),2));
			if(shieldActivated){
				distanceEnemyPlanetCenter = Math.pow((this.pos.x - centerX)/1.2,2) +  Math.pow((this.pos.y - centerY)/1.2,2);
				if(distanceEnemyPlanetCenter < Math.pow((planetDia/2),2) ){
					// console.log('Bullet touches planet');
					this.remove = true;
					enemyHurtSound.play();
				}
			}
			else{
				distanceEnemyPlanetCenter = Math.pow((this.pos.x - centerX)*3,2) +  Math.pow((this.pos.y - centerY)*3,2);
				if(distanceEnemyPlanetCenter < Math.pow((planetDia/2),2) ){
					// console.log('Bullet touches planet');
					this.remove = true;
					planetHealth-=10;
					explosionSound.play();
					enemyHurtSound.play();

				}
			}


  }

	shoot(){
          bullets.push(new Bullet(this.pos.x,this.pos.y,this.bulletSpeed,this.bulletWidth,this.bulletHeight,this.angle + Math.PI,this.bulletPic,this.bulletType ));
					enemyShotSound.play();
	}

}
