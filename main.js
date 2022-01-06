img = "";
objects = [];
status = "";

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {

    mode = document.getElementById("mode").value;

    if (mode == "Live"){

        image(video, 0, 0, 500, 400);

        if (status != ""){
    
            objectDetector.detect(video, gotResult);
    
           for (var i = 0 ; i < objects.length ; i++){
               document.getElementById("status").innerHTML = "Status - Objects Detected";
               document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length;
    
               fill("red");
               percent = floor(objects[i].confidence * 100);
               text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
               noFill();
               stroke("red");
               rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           }
        }
    }
    
    else {

        image(img, 0, 0, 500, 400);

        if (status != ""){
    
            objectDetector.detect(img, gotResult);
    
           for (var i = 0 ; i < objects.length ; i++){
               document.getElementById("status").innerHTML = "Status - Objects Detected";
               document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length;
    
               fill("red");
               percent = floor(objects[i].confidence * 100);
               text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
               noFill();
               stroke("red");
               rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           }
        }
    }

}