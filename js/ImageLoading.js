var planetPic=document.createElement("img");
var blueSatellitePic=document.createElement("img");
var yellowSatellitePic=document.createElement("img");
var backgroundPic=document.createElement("img");
var enemyPic1 = document.createElement("img");



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




    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }

}// end of function loadImages
