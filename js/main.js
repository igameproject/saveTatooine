
  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas;
  var ctx;
  var height;
  var width;
  var centerX;
  var centerY;
  var dx;
  var dy;
  var planetAngle = 0;
  var PLANETANGLECHANGE = 0.001;
  var a = 0;
  var planetDia;
  var satelliteOne;
  var satelliteTwo;
  var planetHealth;
  var score;
  var gameOver,debug = false;
  var opacity;

  var windowState = {
        inFocus : true,
        help : false,
        firstLoad : true
  };

  var gameUpdate;
  var enemyShipSpawn;
  var bulletSpawn;
  var bulletSpawnRate;
  var enemySpawnRate;
  var levelIncrement;
  var gameLoaded=false;

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
    opacity = 0;
    gameOver = false;
    loadImages();
    addInputs();
    satelliteOne = new Satellite(pic = blueSatellitePic, bulletPic = blueSatelliteShotPic, type='shield');
    satelliteTwo = new Satellite(pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic, type='shooter');
    bulletSpawnRate = 2500;
    enemySpawnRate = 3000;


  }

  function drawEverything() {

    if(windowState.inFocus){
      if(windowState.firstLoad){
        ctx.drawImage(backgroundPic,0,0);
        planetAngle += PLANETANGLECHANGE;
        drawBitmapCenteredAtLocationWithRotation(planetPic, centerX, canvas.height , planetAngle);
         colorText('Save Tatooine',canvas.width/2,canvas.height/2-40 ,"white","50px Tahoma ","center",opacity);
  			 colorText("[H] for Help",canvas.width/2  - 5,canvas.height/2 + 20  ,"white","15px Tahoma","center",opacity);
  			 colorText("[Enter] to Play",canvas.width/2  - 5,canvas.height/2  + 40,"white","15px Tahoma","center",opacity);
         opacity = opacity + 0.009;
      }

      if(windowState.help){
        ctx.drawImage(backgroundPic,0,0);
        planetAngle += PLANETANGLECHANGE;
        drawBitmapCenteredAtLocationWithRotation(planetPic, centerX, canvas.height , planetAngle);
        colorText("Save the planet by destroying incoming spaceships",canvas.width/2,200 ,"white","30px Tahoma","center",opacity);
        colorText("Arrow Keys for Movements",canvas.width/2 ,250 ,"#b20000","15px Tahoma","center",opacity);
        colorText("[X] for Shooting",canvas.width/2,280 ,"#b20000","15px Tahoma","center",opacity);
        colorText('Press [Enter] to Start game',canvas.width/2 ,canvas.height/2 ,"white","20px Tahoma","center",opacity);
        opacity = opacity + 0.005;
      }

      if(gameLoaded){
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
                       score += 30;
                  }
                }

               for(var k = i+1; k < bullets.length; k++ ){
                 if(SAT.testPolygonPolygon(bullets[i].satObject, bullets[k].satObject)){
                      bullets[i].remove = true;
                      bullets[k].remove = true;
                 }
               }


            }

            for(var j = 0; j < enemies.length; j++){

              if(SAT.testPolygonPolygon(satelliteOne.satObject, enemies[j].satObject)){
                   satelliteOne.lives--;
                   enemies[j].remove = true;
                   score += 15;
              }
              if(SAT.testPolygonPolygon(satelliteTwo.satObject, enemies[j].satObject)){
                   satelliteTwo.lives--;
                   enemies[j].remove = true;
                   score += 15;
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
            colorRect(0,0,planetHealth * canvas.width/100,40,'#b20000')
            colorText("Planet Health",5,30,"black","30px Arial");
            colorText("Score: " + score,5,60,"white","20px Arial",);
            if(satelliteOne.lives > 0){
              colorText("Satellite-1 Life: " + satelliteOne.lives,5,90,"white","20px Arial");
            }
            else{
              colorText("Satellite-1 Dead" ,5,90,"red","20px Arial");
            }

            if(satelliteTwo.lives > 0){
              colorText("Satellite-2 Life: " + satelliteTwo.lives,5,120,"white","20px Arial");
            }
            else{
              colorText("Satellite-2 Dead" ,5,120,"red","20px Arial");

            }



            if(debug){
              colorText("Bullets: " + bullets.length,5,150,"white","20px Arial");
              colorText("Enemies: " + enemies.length,5,180,"white","20px Arial");
              colorText("Enemies Spawn Rate: " + enemySpawnRate,5,210,"white","20px Arial");
              colorText("Bullet Spawn Rate: " + bulletSpawnRate ,5,240,"white","20px Arial");


            }

            if(planetHealth <= 0){
              gameOver = true;
            }

          }
          else{
            colorText("Final Score - " + score, canvas.width/2 , canvas.height/2 -  60 ,"white"," 50px Arial","center");
            colorText("Game Over . Press Z to restart", canvas.width/2 , canvas.height/2,"white"," 40px Arial","center");
          }

      }
    }
  }




  function loadingDoneSoStartGame(){
    var framesPerSecond = 60;
    gameUpdate = setInterval(drawEverything, 1000/framesPerSecond);


      enemyShipSpawn =  setInterval(function() {
        if(!gameOver && gameLoaded){
              enemies.push(new Enemy());
        }
      }, enemySpawnRate); //2000'

      bulletSpawn = setInterval(function() {
        if(!gameOver && gameLoaded){
          for(var i = 0; i < enemies.length; i++ ){
            enemies[i].shoot();
          }
        }
      }, bulletSpawnRate); //2500


    levelIncrement = setInterval(function(){
      if(!gameOver && gameLoaded){
        if(enemySpawnRate > 1000){
          enemySpawnRate -= 500
          clearInterval(enemyShipSpawn);

          enemyShipSpawn =  setInterval(function() {
                  enemies.push(new Enemy());
              }, enemySpawnRate); //2000'


        }
        if (bulletSpawnRate > 1500){
          bulletSpawnRate -= 100;
          clearInterval(bulletSpawn);

          bulletSpawn = setInterval(function() {
              for(var i = 0; i < enemies.length; i++ ){
                    enemies[i].shoot();
                  }
          }, bulletSpawnRate); //2500
        }

      }

    }, 20000)



  }

function gameReset(){
  planetHealth = 100;
  score = 0;
  gameOver = false;
  satelliteOne = new Satellite(pic = blueSatellitePic, bulletPic = blueSatelliteShotPic, type='shield');
  satelliteTwo = new Satellite(pic = yellowSatellitePic,  bulletPic = yellowSatelliteShotPic, type='shooter');
  bullets = [];
  enemies = [];
  bulletSpawnRate = 2500;
  enemySpawnRate = 3000;
}
