
  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas, ctx;
  var height, width;
  var centerX,centerY;
  var  dx,dy;
  var planetAngle = 0;
  const PLANETANGLECHANGE = 0.001
  var  a = 0;
  var planetDia;
  //
  // var innerSatelliteAngle = 0;
  // var innerSatelliteX = innerSatelliteY = 100;
  //
  // var outerSatelliteAngle = 0;
  // var outerSatelliteX = outerSatelliteY = 125;
  //
  // var satelliteHeight = 13;
  // var satelliteWidth = 43;

  var  innerSatellite = true;

  // var  outerSatellite = false;

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
    planetDia = planetPic.height;
    loadImages();
    addInputs();
    var innerSatellite = new Satellite(100,0.1,0.15,blueSatellitePic);
    var outerSatellite = new Satellite(125,1,0.3,yellowSatellitePic);


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
    // clear the game view by filling it with black
    // colorRect(0, 0, canvas.width, canvas.height, 'black');
    ctx.drawImage(backgroundPic,0,0); // center, draw
    planetAngle += PLANETANGLECHANGE;
    drawBitmapCenteredAtLocationWithRotation(planetPic, canvas.width/2, canvas.height/2,planetAngle);
    innerSatellite.draw();
    // ctx.save();
    // ctx.translate(centerX, centerY);
    // ctx.rotate(innerSatelliteAngle);
    // drawBitmapCenteredAtLocationWithRotation(blueSatellitePic, innerSatelliteX, innerSatelliteY ,Math.PI/2*0.1);
    // ctx.restore();
    //
    // ctx.save();
    // ctx.translate(centerX, centerY);
    // ctx.rotate(outerSatelliteAngle);
    // drawBitmapCenteredAtLocationWithRotation(yellowSatellitePic, outerSatelliteX, outerSatelliteY ,Math.PI/2);
    // ctx.restore();
  }




function loadingDoneSoStartGame(){
   var framesPerSecond = 60;
    setInterval(function() {
        drawEverything();
      }, 1000/framesPerSecond);

}
