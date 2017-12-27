
var leftArrowButtonHold = false;
var rightArrowButtonHold = false;
// var shootKeyHold = false;



function addInputs(){
  document.addEventListener('keydown', function(evt){
    // console.log(evt.code)
    // if(evt.code == "KeyZ"){
    //  innerSatelliteSelected = !innerSatelliteSelected;
    // }

    if(evt.code  == "ArrowLeft"){
      leftArrowButtonHold = true;

    }

    if(evt.code  == "ArrowRight"){
      rightArrowButtonHold = true;
    }

    //shoot shoot
    if(evt.code  == "KeyX"){
      // shootKeyHold = true;

        innerSatellite.shoot();
        outerSatellite.shoot();

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
