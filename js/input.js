
var leftArrowButtonHold = false;
var rightArrowButtonHold = false;
// var shootKeyHold = false;

function windowOnFocus() {
	if(!windowState.inFocus) {
    console.log('focussed');

		windowState.inFocus = true;
		gameUpdate = setInterval(drawEverything, 1000/60);
    bulletSpawn = setInterval(function() {
        for(var i = 0; i < enemies.length; i++ ){
              enemies[i].shoot();
            }
    }, bulletSpawnRate); //2500
    enemyShipSpawn =  setInterval(function() {
            enemies.push(new Enemy());
        }, enemySpawnRate); //2000'
    levelIncrement = setInterval(function(){

            if(enemySpawnRate > 1000){
              enemySpawnRate -= 1000
              clearInterval(enemyShipSpawn);

              enemyShipSpawn =  setInterval(function() {
                      enemies.push(new Enemy());
                  }, enemySpawnRate); //2000'


            }
            if (bulletSpawnRate > 100){
              bulletSpawnRate -= 100;
              clearInterval(bulletSpawn);

              bulletSpawn = setInterval(function() {
                  for(var i = 0; i < enemies.length; i++ ){
                        enemies[i].shoot();
                      }
              }, bulletSpawnRate); //2500
            }
      }, 10000)
		// if (assaultMode){
		// 	gameShipSpawn = setInterval(shipSpawn, 500);
		// 	gameGunnerSpawn = setInterval(gunnerSpawn, 1500);
		// }
	}
};

function windowOnBlur() {
  // console.log('blurred');
	// if (pauseOnLoseFocus) {
		clearInterval(enemyShipSpawn);
		clearInterval(bulletSpawn);
    clearInterval(levelIncrement);
		windowState.inFocus = false;
		clearInterval(gameUpdate);
	// }
};

function addInputs(){
  window.addEventListener("focus", windowOnFocus);
 	window.addEventListener("blur", windowOnBlur);
  document.addEventListener('keydown', function(evt){


    if(evt.code  == "Enter"){
      if(windowState.firstLoad){
  				windowState.firstLoad = false;
  				gameLoaded = true;
					menuMusicSound.startOrStopMusic();
					mainMusicSound.loopSong();
  			}
  		if(windowState.help){
  				windowState.help = false;
  				gameLoaded = true;
					menuMusicSound.startOrStopMusic();
					mainMusicSound.loopSong();
  		}
    }

    if(evt.code  == "KeyH"){
      console.log(windowState.help)
      if(!windowState.help){
        windowState.firstLoad = false;
        windowState.help = true;
      }

    }

    // console.log(evt.code);

    if(evt.code  == "ArrowLeft"){
      leftArrowButtonHold = true;

    }

    if(evt.code  == "ArrowRight"){
      rightArrowButtonHold = true;
    }

    //shoot shoot
    if(evt.code  == "KeyX"){

        // satelliteOne.shoot();
        // satelliteTwo.shoot();
				// satelliteShotSound.play();
				// setTimeout(function(){console.log('Doing Nothing')},10000)

    }
    if(evt.code  == "KeyZ"){

      if(gameOver){
        gameReset();
      }

    }



    if(evt.code  == "KeyO"){
      gameOver =!gameOver;
    }

    if(evt.code  == "KeyD"){
      // shootKeyHold = true;

        debug = !debug;

    }

  });

  document.addEventListener('keyup', function(evt){

    if(evt.code  == "ArrowLeft"){
      leftArrowButtonHold = false;
    }

    if(evt.code  == "ArrowRight"){
      rightArrowButtonHold = false;

    }

    //shoot shoot
    if(evt.code  == "KeyX"){
			satelliteOne.shoot();
			satelliteTwo.shoot();
			satelliteShotSound.play();
    }

  });
}
