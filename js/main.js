
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
      score,
      gameOver,debug = false;

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
    gameOver = false;
    loadImages();
    addInputs();
    satelliteOne = new Satellite(pic = blueSatellitePic, bulletPic = blueSatelliteShotPic, type='shield');
    satelliteTwo = new Satellite(pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic, type='shooter');
  }

  function drawEverything() {
    ctx.drawImage(backgroundPic,0,0); // center, draw
    if(!gameOver){
      planetAngle += PLANETANGLECHANGE;
      drawBitmapCenteredAtLocationWithRotation(planetPic, centerX, centerY, planetAngle);
      satelliteOne.move();
      satelliteTwo.move();
      satelliteOne.draw();
      satelliteTwo.draw();


      for(var i = 0; i < bullets.length; i++ ){
          // console.log(bullets[i].satObject);

          if(SAT.testPolygonPolygon(bullets[i].satObject, satelliteOne.satObject) &&
             bullets[i].type == 'enemy'){
               bullets[i].remove = true;
               satelliteOne.lives--;
          }

          if(SAT.testPolygonPolygon(bullets[i].satObject, satelliteTwo.satObject) &&
             bullets[i].type == 'enemy'){
               bullets[i].remove = true;
               satelliteTwo.lives--;

          }

          for(var j = 0; j < enemies.length; j++){

            if(SAT.testPolygonPolygon(bullets[i].satObject, enemies[j].satObject) && bullets[i].type == 'satellite'){
                 bullets[i].remove = true;
                 enemies[j].remove = true;
                 score += 20;
            }
          }
      }

      for(var j = 0; j < enemies.length; j++){

        if(SAT.testPolygonPolygon(satelliteOne.satObject, enemies[j].satObject)){
             satelliteOne.lives--;
             enemies[j].remove = true;
             score += 20;
        }
        if(SAT.testPolygonPolygon(satelliteTwo.satObject, enemies[j].satObject)){
             satelliteTwo.lives--;
             enemies[j].remove = true;
             score += 20;
        }
      }

      if(satelliteOne.lives<=0){
        satelliteOne.remove = true;
      }

      if(satelliteTwo.lives<=0){
        satelliteTwo.remove = true;
      }

      if(satelliteTwo.lives<=0 && satelliteOne.lives<=0){
        gameOver = true;
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

      colorText("Planet Health: " + planetHealth,5,30,"white","30px Arial");
      colorText("Score: " + score,5,60,"white","20px Arial",);
      colorText("Satellite-1 Life: " + satelliteOne.lives,5,90,"white","20px Arial");
      colorText("Satellite-2 Life: " + satelliteTwo.lives,5,120,"white","20px Arial");

      if(debug){
        colorText("Bullets: " + bullets.length,5,150,"white","Arial");
        colorText("Enemies: " + enemies.length,5,180,"white","Arial");

      }

      if(planetHealth <= 0){
        gameOver = true;
      }

    }
    else{
      colorText("Final Score - " + score, canvas.width/2 , canvas.height/2 -  60 ,"white"," 50px Arial","center");
      colorText("Game Over . Press X to restart", canvas.width/2 , canvas.height/2,"white"," 40px Arial","center");
    }


  }

function loadingDoneSoStartGame(){
   var framesPerSecond = 60;
    setInterval(function() {
        drawEverything();

      }, 1000/framesPerSecond);

    if(!gameOver){
      setInterval(function() {
            enemies.push(new Enemy());

        }, 3000); //2000
      setInterval(function() {
        for(var i = 0; i < enemies.length; i++ ){
          enemies[i].shoot();

        }

      }, 2500); //2500
      // setInterval(function() {
      //   score+=10;
      //
      // }, 4000); //2500
    }


}

function gameReset(){
  planetHealth = 100;
  score = 0;
  gameOver = false;
  satelliteOne = new Satellite(pic = blueSatellitePic, bulletPic = blueSatelliteShotPic, type='shield');
  satelliteTwo = new Satellite(pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic, type='shooter');
  bullets = [];
  enemies = [];
}
