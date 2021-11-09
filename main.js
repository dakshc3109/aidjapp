var music = "";
var leftWristScore = 0;
var rightWristScore = 0;
var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;


function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    //canvas.position(440, 160);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is intialized");
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
	
	    leftWristScore = results[0].pose.keypoints[9].score*1000;
	    rightWristScore = results[0].pose.keypoints[10].score*100;
	    console.log(leftWristScore);
		console.log(rightWristScore);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");
	//circle(552.5809001364903, 539.4442585430182, 20);
	console.log(rightWristScore); 
	if(rightWristScore > 0.2){
		circle(rightWristX, rightWristY, 20);
		if(rightWristY > 0 && rightWristY<=100){
			document.getElementById("speed").innerHTML = "Speed: 0.5";
			music.rate(0.5);
		}

		else if(rightWristY > 100 && rightWristY<=200){
			document.getElementById("speed").innerHTML = "Speed: 1";
			music.rate(1);
		}

		else if(rightWristY > 200 && rightWristY<=300){
			document.getElementById("speed").innerHTML = "Speed: 1.5";
			music.rate(1.5);
		}

		else if(rightWristY > 300 && rightWristY<=400){
			document.getElementById("speed").innerHTML = "Speed: 2";
			music.rate(2);
		}

		else if(rightWristY > 400){
			document.getElementById("speed").innerHTML = "Speed: 2.5";
			music.rate(2.5);
		}
	}

    if(leftWristScore > 0.2){
	    circle(leftWristX, leftWristY, 20);
	    
	    inNumberLeftWristY = Number(leftWristY);
	    withoutDecimalLeftWristY = floor(inNumberLeftWristY);
	    console.log(withoutDecimalLeftWristY);
	    divide = withoutDecimalLeftWristY/1000;
	    //volume = divide*2;
	    //volume = withoutDecimalLeftWristY/500;
	    console.log("volume : "+divide);
	    document.getElementById("volume").innerHTML = "Volume: "+divide;
	    music.setVolume(divide);
	}
}



function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}