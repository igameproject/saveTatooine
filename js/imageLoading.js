var planetPic=document.createElement("img");
var blueSatellitePic=document.createElement("img");
var yellowSatellitePic=document.createElement("img");
var backgroundPic=document.createElement("img");
var enemyPic1 = document.createElement("img");
var blueSatelliteShotPic = document.createElement("img");
var yellowSatelliteShotPic = document.createElement("img");
var EnemyShotPic = document.createElement("img");
var shieldPic = document.createElement("img");
var shieldPowerupPic = document.createElement("img");
var healthPowerupPic = document.createElement("img");
var swirlPowerupPic = document.createElement("img");
var scorePowerupPic = document.createElement("img");





var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}


function loadImages() {

  var imageList = [
    {varName:planetPic, theFile:"planet.png"},
    {varName:backgroundPic, theFile:"background.png"},
    {varName:yellowSatellitePic, theFile:"yellow-satellite.png"},
    {varName:blueSatellitePic, theFile:"blue-satellite.png"},
    {varName:enemyPic1, theFile:"enemy1.png"},
    {varName:blueSatelliteShotPic, theFile:"blueBullet.png"},
    {varName:yellowSatelliteShotPic, theFile:"yellowBullet.png"},
    {varName:EnemyShotPic, theFile:"redBullet.png"},
    {varName:shieldPic, theFile:"shield.png"},
    {varName:swirlPowerupPic, theFile:"swirlPowerup.png"},
    {varName:shieldPowerupPic, theFile:"shieldPowerup.png"},
    {varName:healthPowerupPic, theFile:"healthPowerup.png"},
    {varName:scorePowerupPic, theFile:"healthPowerup.png"},//change this








    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }

}// end of function loadImages
