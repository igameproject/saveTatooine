
let Satellites = [];

class Satellite{

	constructor(satellitePic,bulletPic,type){
    this.angle = 0;
    this.radius = 130;
    this.height = 13;
    this.width = 43;
    this.speed = 0.035;
    this.satellitePic = satellitePic;
		this.pos = vec2.create();
		this.originalTilt = 90;
    this.getXY();
		this.type = type;
		this.bulletSpeed = 4;
		this.bulletWidth  = 5;
		this.bulletHeight  = 10;
		this.bulletPic = bulletPic;
		this.bulletType = 'satellite';
		this.lives = 5;
		//satObject need an initial minimum points //Drawn from bottom.
		// this.initlalSatObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon();
		this.satObject;
		this.remove = false;
	}

	draw(){

				if(!this.remove){
					 drawBitmapCenteredAtLocationWithRotation(this.satellitePic, this.pos.x, this.pos.y ,this.tilt);
				}

	}

  getXY(){

				if(this.type == 'shield'){
					this.pos.x  = centerX + this.radius * Math.cos(this.angle);
	        this.pos.y  = centerY + this.radius * Math.sin(this.angle);
				}
				if(this.type == 'shooter'){
					this.pos.x  = centerX - this.radius * Math.cos(this.angle);
	        this.pos.y  = centerY - this.radius * Math.sin(this.angle);
				}

				//Make it maintain same angle accross entire planet. Give a feel of geostationary.
				this.tilt = Math.atan2(this.pos.y - canvas.height/2, this.pos.x - canvas.width/2);
				this.tilt += Math.PI/180 * this.originalTilt ;
				this.satObject = new SAT.Box(new SAT.Vector(this.pos.x - this.width/2 , this.pos.y + this.height/2), this.width, this.height).toPolygon().rotate(-this.tilt);
  }

  move(){
		if(!this.remove){
			if(leftArrowButtonHold){
	      this.angle -= this.speed;
	      this.getXY();
	    }
	    if(rightArrowButtonHold){
	      this.angle += this.speed;
	      this.getXY();
	    }
			else{
				this.getXY();
			}
		}
  }

	shoot(){

		if(!this.remove){
			bullets.push(new Bullet(this.pos.x,this.pos.y,this.bulletSpeed,this.bulletWidth,this.bulletHeight,this.tilt,this.bulletPic,this.bulletType));
		}


	}



}
