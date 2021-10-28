var leftWristScore = 0;
var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var music = "";
function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(440, 160);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);


    fill("#FF0000");
    stroke("FF0000");
    if(leftWristScore > 0.2){
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWristY = Number(leftWristY);
    withoutDecimalLeftWristY = floor(inNumberLeftWristY);
    console.log(withoutDecimalLeftWristY);
    //divide = withoutDecimalLeftWristY/1000;
    //volume = divide*2;
    volume = withoutDecimalLeftWristY/600;
    console.log("volume : "+volume);
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    music.setVolume(volume);
    }
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
    if(results.length > 0){
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x "+leftWristX+" leftWristY "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x "+rightWristX+" rightWristY "+rightWristY);

    leftWristScore = results[0].pose.keypoints[9].score;
    console.log(leftWristScore)
    }
}