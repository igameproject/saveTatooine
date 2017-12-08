
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  ctx.save(); // allows us to undo translate movement and rotate spin
  ctx.translate(atX,atY); // sets the point where our graphic will go
  ctx.rotate(withAngle); // sets the rotation
  ctx.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  ctx.restore(); // undo the translation movement and rotation since save()
}

