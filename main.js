//main.js
var music = "";
function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(440, 160);

    video = createCapture(400, 400);
    video.hide();
}

function draw(){
    image(video, 0, 0, 400, 400);
}

function play(){
    music.play();
}