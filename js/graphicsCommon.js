
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  ctx.save(); // allows us to undo translate movement and rotate spin
  ctx.translate(atX,atY); // sets the point where our graphic will go
  ctx.rotate(withAngle); // sets the rotation
  ctx.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  ctx.restore(); // undo the translation movement and rotation since save()
}

function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function drawBall(centerX,centerY,radius,fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY,10,0,Math.PI*2,true);
	ctx.fill();
}

function colorText(showWords,textX,textY,fillColor,fontface,textAlign = 'left' ) {
  ctx.save();
	ctx.textAlign = textAlign;
	ctx.font = fontface;
	ctx.fillStyle = fillColor;
	ctx.fillText(showWords, textX, textY);
  ctx.restore();
}
