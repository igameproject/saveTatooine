var bullets = [];

class Bullet{
	constructor(x,y,speed,width,height,angle,bulletpic,type){
		this.pos = vec2.create(x,y);
		this.speed = speed;
		this.height = height;
		this.width = width;
    this.angle = angle;
		this.pic = bulletpic;
		this.type = type;
    this.velocity = vec2.create(Math.cos(angle - Math.PI/2)* this.speed ,Math.sin(angle - Math.PI/2)* this.speed);
		this.type = type;
		this.remove = false;
		this.satObject = new SAT.Box(new SAT.Vector(x - width/2 , y + height/2), width, height).toPolygon().rotate(angle - Math.PI/2);
	}

	move(){
    vec2.add(this.pos,this.pos,this.velocity);
		this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(this.angle - Math.PI/2);
		if(this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > canvas.height){
				this.remove = true;
		}

		if(this.type == 'enemy'){
			// console.log(centerY);
			var distanceBulletPlanetCenter = Math.pow((this.pos.x - centerX),2) +  Math.pow((this.pos.y - centerY),2);
			// console.log(distanceBulletPlanetCenter);
			//  console.log(Math.pow((planetDia/2),2));

			if(distanceBulletPlanetCenter < Math.pow((planetDia/2),2) ){
				// console.log('Bullet touches planet');
				this.remove = true;
				planetHealth-=5;
				explosionSound.play();
			}
		}

		// if(this.pos.x )
	}

	draw(){
		this.move();
		// console.log(this.color)
		drawBitmapCenteredAtLocationWithRotation(this.pic, this.pos.x, this.pos.y ,this.angle);

		// colorRect(this.pos.x - this.width/2 , this.pos.y - this.height/2, this.width, this.height, this.color);

	}




}
