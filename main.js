song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup()
{
    canvas = createCanvas(600, 500);
    
    
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function modelLoaded()
{
    console.log('Posenet Is Initialized');
}

function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist  > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        music2.play();
       
    }

    if(scoreRightWrist >0.2)
    {
        circle(rightWristX, rightWristY, 20);
        music.play();
    }
}
function play()
{
    song.play();
    song.setVolume(1)
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWristX+"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX ="+ rightWristX+"rightwristY ="+ rightWristY);


        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist =" + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist =" + scoreRightWrist);
    }
}