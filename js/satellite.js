
let Satellites = [];

class Satellite{

	constructor(radius,tilt  = 1,angle,satellitePic){
    this.satelliteAngle = 0;
    this.radius = radius;
    this.satelliteHeight = 13;
    this.satelliteWidth = 43;
    this.satelliteTilt = Math.PI/2 * tilt;
    this.satelliteAngleIncrement = angle;
    this.satellitePic = satellitePic;

	}

	draw(){
    console.log('Drawing')
	}



}
