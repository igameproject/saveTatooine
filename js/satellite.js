
let Satellites = [];

class Satellite{

	constructor(radius,tilt,speed,pic,bulletPic){
    this.angle = 0;
    this.radius = radius;
    this.height = 13;
    this.width = 43;
    this.speed = speed;
    this.pic = pic;
		this.originalTilt = tilt;
    this.getXY();
		this.bulletSpeed = 4;
		this.bulletWidth  = 5;
		this.bulletHeight  = 10;
		this.bulletPic = bulletPic;
		this.bulletType = 'satellite';
		this.satObject = new SAT.Box(new SAT.Vector(this.x - this.width/2 , this.y + this.height/2), this.width, this.height).toPolygon();

	}

	draw(){
        // console.log('hey')
        drawBitmapCenteredAtLocationWithRotation(this.pic, this.x, this.y ,this.tilt);
	}

  getXY(tilt){
        this.x  = centerX + this.radius * Math.cos(this.angle);
        this.y  = centerY + this.radius * Math.sin(this.angle);
				this.tilt = Math.atan2(this.y - canvas.height/2, this.x - canvas.width/2);
				this.tilt += Math.PI/180 * this.originalTilt ;
  }

  move(){
		if(leftArrowButtonHold){
      this.angle -= this.speed;
      this.getXY();
    }
    if(rightArrowButtonHold){
      this.angle += this.speed;
      this.getXY();
    }
  }

	shoot(){
		// console.log(this.bulletColor);
		bullets.push(new Bullet(this.x,this.y,this.bulletSpeed,this.bulletWidth,this.bulletHeight,this.tilt,this.bulletPic,this.bulletType));


	}



}
