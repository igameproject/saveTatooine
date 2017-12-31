powerups = [];

class Powerup{
	constructor(position,velocity,angle,powerupPic,powerupName){
		this.pos = position;
		this.velocity = velocity;
		// vec2.scale(this.velocity,this.velocity,0.5)
		this.angle = angle;
		this.pic = powerupPic;
		this.name = powerupName;
		this.remove = false;
		this.height = 10;
		this.width = 10;
		this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.angle);

	}

	draw(){
		this.move();
		ctx.drawImage(this.pic,this.pos.x,this.pos.y);
	}

	move(){
		vec2.add(this.pos,this.pos,this.velocity);
		this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.angle);

		// this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.angle);
		if(this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > canvas.height){
				this.remove = true;
		}

	}

	actionForPowerup(){

		if(this.name == "shield"){
			shieldActivated = true;
			setTimeout(function(){shieldActivated = false;},10000);
		}
		if(this.name == "extraScore"){
			score+=500;
		}
		if(this.name == "swirlPowerup"){
			swirling = true;
			setTimeout(function(){swirling = false;},10000);
		}
		if(this.name == "healthPowerup"){
			planetHealth = 100;
			satelliteOne.lives = 5;
			satelliteTwo.lives = 5;
		}

	}
}
