// 
// let bullets = [];
//
// class Bullet{
//
// 	constructor(x,y,type,angle){
// 		this.x = x;
// 		this.y = y;
//     // type 1 - satellite outer - Satellite low intensity high frequency shots
//     // type 2 - satellite inner - High Intensity Low frequency shots
//     // type 3 - satellite outer - Medium intensity Medium frequency enemy shots.
//     this.type = type;
//     switch(this.type){
//       case 'type 1':
//         this.velocity = 5; //outer satellite // goes to half the screen
//         this.height = 10;
//     		this.width = 5;
//         this.intensity = 3;
//         this.color = 'yellow'
//         break;
//       case 'type 2':
//           this.velocity = 3; //inner satellite //goes to end of screen
//           this.height = 10;
//       		this.width = 5;
//           this.intensity = 5;
//           this.color = 'blue'
//           break;
//       case 'type 3': //enemy
//           this.velocity = 4; // goes to 3/4 of screen
//           this.height = 10;
//       		this.width = 5;
//           this.intensity = 4;
//           this.color = 'red'
//           break;
//       }
//       this.velocityY = this.velocity * Math.cos(angle);
//       this.velocityX = this.velocity * Math.sin(angle);
//     }
//
//
//   move(){
//       if(this.x > 0 && this.x < width){
//         this.x += this.velocityX;
//       }
//       if(this.y > 0 && this.y < height){
//         this.y += this.velocityY;
//       }
//       else{
//         bullets.pop();
//       }
//   }
//
// 	draw(){
// 		colorRect(this.x, this.y, this.width, this.height, this.color);
// 	}
//
//   create(){
//     this.move();
//     this.draw();
//   }
//
//
// }
