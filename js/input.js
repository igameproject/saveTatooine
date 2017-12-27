
var leftArrowButtonHold = false;
var rightArrowButtonHold = false;
// var shootKeyHold = false;



function addInputs(){
  document.addEventListener('keydown', function(evt){

    if(evt.code  == "ArrowLeft"){
      leftArrowButtonHold = true;

    }

    if(evt.code  == "ArrowRight"){
      rightArrowButtonHold = true;
    }

    //shoot shoot
    if(evt.code  == "KeyX"){
      // shootKeyHold = true;
      if(gameOver){
        gameReset();
      }
      else{
        satelliteOne.shoot();
        satelliteTwo.shoot();
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
    // if(evt.code  == "KeyX"){
    //   shootKeyHold = false;
    // }

  });
}
