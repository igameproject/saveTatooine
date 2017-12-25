
  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas,
      ctx,
      height,
      width,
      centerX,
      centerY,
      dx,
      dy,
      planetAngle = 0,
      PLANETANGLECHANGE = 0.001,
      a = 0,
      planetDia,
      innerSatellite,
      outerSatellite,
      innerSatelliteSelected = false,
      planetHealth,
      score;
      // outerSatelliteSelected = false;




  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
    planetDia = 220;
    planetHealth = 100;
    score = 0;
    loadImages();
    addInputs();
    innerSatelliteSelected = true;
    innerSatellite = new Satellite(radius = 130, tilt = 30 , speed =  0.035, pic = blueSatellitePic, bulletPic = blueSatelliteShotPic);
    outerSatellite = new Satellite(radius = 165, tilt = 120 , speed = 0.025, pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic);


    // these next few lines set up our game logic and render to happen 30 times per second
    // document.body.addEventListener("mousemove", function(event) {
    //    dx = event.clientX - centerX;
    //    dy = event.clientY - centerY;
    //    if(innerSatellite){
    //      innerSatelliteAngle = Math.atan2(dy, dx);
    //    }
    //    else{
    //      outerSatelliteAngle = Math.atan2(dy, dx);
    //    }
    //
    //  });

  }

  function drawEverything() {
    ctx.drawImage(backgroundPic,0,0); // center, draw
    planetAngle += PLANETANGLECHANGE;
    drawBitmapCenteredAtLocationWithRotation(planetPic, centerX, centerY,planetAngle);
    innerSatelliteSelected ? innerSatellite.move() : outerSatellite.move();
    innerSatellite.draw();
    outerSatellite.draw();

    // if(shootKeyHold){
    //   if(innerSatelliteSelected){
    //     innerSatellite.shoot();
    //   }
    //   else{
    //     outerSatellite.shoot();
    //   }
    // }
    // console.log(bullets);
    for(var i = 0; i < bullets.length; i++ ){

        console.log(SAT.testPolygonPolygon(bullets[i].satObject, innerSatellite.satObject ))
        // if(){
        //   console.log('collided');
        // }




    }

    for(var i = 0; i < bullets.length; i++ ){
      if(!bullets[i].remove){
        bullets[i].draw();
      }

    }

    for(var i = 0; i < bullets.length; i++ ){
      if(bullets[i].remove){
        bullets.splice(i,1);
      }

    }

    for(var i = 0; i < enemies.length; i++){
      if(!enemies[i].remove){
        enemies[i].draw();
      }

    }

    for(var i = 0; i < enemies.length; i++ ){
      if(enemies[i].remove){
        enemies.splice(i,1);
      }

    }

    colorText("Bullets: " + bullets.length,5,10,"white","Arial");
    colorText("Enemies: " + enemies.length,5,20,"white","Arial");
    colorText("Planet Health: " + planetHealth,5,30,"white","Arial");
    colorText("Score: " + score,5,40,"white","Arial");




  }

function loadingDoneSoStartGame(){
   var framesPerSecond = 60;
    setInterval(function() {
        drawEverything();

      }, 1000/framesPerSecond);

    setInterval(function() {
          enemies.push(new Enemy());

      }, 3000); //2000
    setInterval(function() {
      for(var i = 0; i < enemies.length; i++ ){
        enemies[i].shoot();

      }

    }, 2500); //2500
    setInterval(function() {
      score+=10;

    }, 4000); //2500

}
