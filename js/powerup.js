powerups = [];

class Powerup{
	constructor(posX,posY,powerupPic,powerupName){
		this.x = posX;
		this.y = posY;
		this.pic = powerupPic;
		this.name = powerupName;
		this.speed = 2;
		this.powerupCaught = false;
		this.remove = false;
	}

	draw(){
		ctx.drawImage(this.pic,this.x,this.y);
	}

	move(){

	}

	actionForPowerup(){

		if(this.name == "Health Increase"){
			numLives++;
		}
		if(this.name == "Swirl Bullets"){
			score+=1000;
		}
		if(this.name == "Shield"){
			stickyBall = true;
			setTimeout(function(){stickyBall = false;},16000);
		}

	}
}
