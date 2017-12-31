var audioFormat;

var satelliteShotSound = new SoundOverlapsClass("./audio/regularShoot");
var enemyShotSound = new SoundOverlapsClass("./audio/enemyShoot");
var explosionSound = new SoundOverlapsClass("./audio/explosion");
var satelliteHurtSound = new SoundOverlapsClass("./audio/hurt");
var enemyHurtSound = new SoundOverlapsClass("./audio/hurtEnemy");
var menuMusicSound = new backgroundMusicClass("./audio/menu");
var mainMusicSound = new backgroundMusicClass("./audio/suspain");
var powerupSound = new SoundOverlapsClass("./audio/powerup");




var currentBackgroundMusic;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function backgroundMusicClass(filenameWithPath) {

    let musicSound = null;

    this.loopSong = function() {
        setFormat(); // calling this to ensure that audioFormat is set before needed

        if (musicSound != null) {
            musicSound.pause();
            musicSound = null;
        }
        musicSound = new Audio(filenameWithPath + audioFormat);
        musicSound.loop = true;
        musicSound.play();
    }

    this.pauseSound = function() {
        musicSound.pause();
    }

    this.startOrStopMusic = function() {
        if (musicSound.paused) {
            musicSound.play();
        } else {
            musicSound.pause();
        }
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();

    var altSoundTurn = false;
    var mainSound = new Audio(filenameWithPath + audioFormat);
    var altSound = new Audio(filenameWithPath + audioFormat);

    this.play = function() {
        if (altSoundTurn) {
            altSound.currentTime = 0;
            altSound.volume = getRandomVolume();
            altSound.play();
        } else {
            mainSound.currentTime = 0;
            mainSound.volume = getRandomVolume();
            mainSound.play();
        }

        this.altSoundTurn = !this.altSoundTurn; //toggling between true and false
    }
}

function getRandomVolume(){
	var min = 0.5;
	var max = 1;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}
