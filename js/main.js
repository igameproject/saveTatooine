
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
      satelliteOne,
      satelliteTwo,
      planetHealth,
      score;

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
    satelliteOne = new Satellite(pic = blueSatellitePic, bulletPic = blueSatelliteShotPic, type='shield');
    satelliteTwo = new Satellite(pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic, type='shooter');
  }

  function drawEverything() {
    ctx.drawImage(backgroundPic,0,0); // center, draw
    planetAngle += PLANETANGLECHANGE;
    drawBitmapCenteredAtLocationWithRotation(planetPic, centerX, centerY, planetAngle);
    satelliteOne.move();
    satelliteTwo.move();
    satelliteOne.draw();
    satelliteTwo.draw();


    // if(shootKeyHold){
    //   if(satelliteOneSelected){
    //     satelliteOne.shoot();
    //   }
    //   else{
    //     satelliteTwo.shoot();
    //   }
    // }
    // console.log(bullets);
    for(var i = 0; i < bullets.length; i++ ){
        // console.log(bullets[i].satObject);

        if(SAT.testPolygonPolygon(bullets[i].satObject, satelliteOne.satObject) &&
           bullets[i].type == 'enemy'){
             bullets[i].remove = true;
             satelliteOne.remove = true;

        }

        if(SAT.testPolygonPolygon(bullets[i].satObject, satelliteTwo.satObject) &&
           bullets[i].type == 'enemy'){
             bullets[i].remove = true;
             satelliteTwo.remove = true;
        }



        for(var j = 0; j < enemies.length; j++){

          if(SAT.testPolygonPolygon(bullets[i].satObject, enemies[j].satObject) && bullets[i].type == 'satellite'){
               bullets[i].remove = true;
               enemies[j].remove = true;
          }
        }


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
