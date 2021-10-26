var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var music = "";
function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(440, 160);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 400, 400);
}

function modelLoaded(){
    console.log("pose net is intialized");
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function gotPoses(results){
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x "+leftWristX+" leftWristY "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x "+rightWristX+" rightWristY "+rightWristY);
}