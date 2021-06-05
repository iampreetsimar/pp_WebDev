let videoEl = document.querySelector("#video-stream");
let recordBtn = document.querySelector("#record-btn");
let captureBtn = document.querySelector("#capture-btn");
let recordTime = document.querySelector(".record-time-container");
let filterContainer = document.querySelector(".filter-container");
let uiFilter = document.querySelector(".ui-filter");
let zoomContainer = document.querySelector(".zoom-container");

let buffer = [];
let constraints = { video: true, audio: true };
let mediaRecorder;
let recordState = false;
let clearTimerObject;
let selectedFilterColor = "";
let zoomLevel = 1;

navigator.mediaDevices.getUserMedia(constraints)
.then(function (mediaStream) {
    videoEl.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.addEventListener("dataavailable", function (e) {
        buffer.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
        let blob = new Blob(buffer, { type: "video/mp4" });
        const url = window.URL.createObjectURL(blob);

        // commenting to use indexedDB
        // let a = document.createElement("a");
        // a.href = url;
        // a.download = "file.mp4";
        // a.click();

        // USE OF INDEXED DB TO STORE VIDEO
        addMediaToDB(url, "video");

        buffer = [];
    });
}).catch(function (err) {
    console.log(err);
})

recordBtn.addEventListener("click", function () {
    if(!recordState) {
        recordBtn.classList.add("record-animation");
        mediaRecorder.start();
        startTimer();
        recordState = true;
    } else {
        recordBtn.classList.remove("record-animation");
        mediaRecorder.stop();
        stopTimer();
        recordState = false;
    }
})

function startTimer() {
    let timerCount = 0;
    recordTime.classList.add("timing-active");
    clearTimerObject = setInterval(function () {
        let seconds = timerCount % 60 < 10 ? `0${timerCount % 60}` : `${timerCount % 60}`;
        let minutes = Number.parseInt(timerCount / 60) < 10 ? `0${Number.parseInt(timerCount / 60)}` : `${Number.parseInt(timerCount / 60)}`;
        let hours = Number.parseInt(timerCount / 3600) < 10 ? `0${Number.parseInt(timerCount / 3600)}` : `${Number.parseInt(timerCount / 3600)}`;
        recordTime.innerText = `${hours}:${minutes}:${seconds}`;
        timerCount++;
    }, 1000);
}

function stopTimer() {
    recordTime.classList.remove("timing-active");
    recordTime.innerText = "00:00:00";
    clearInterval(clearTimerObject);
}

captureBtn.addEventListener("click", function () {
    // added capture animation class
    captureBtn.classList.add("capture-animation");

    // create a canvas
    // set height and width equal to video frame
    let canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;

    let ctx = canvas.getContext("2d");

    // to flip horizontally 
    // ctx.translate(canvas.width, canvas.height);
    // ctx.scale(-1, 1);

    // consider zoom level
    ctx.scale(zoomLevel, zoomLevel);
    let x = (canvas.width/zoomLevel - canvas.width)/2;
    let y = (canvas.height/zoomLevel - canvas.height)/2;

    // draw frame on canvas using drawImage
    ctx.drawImage(videoEl, x, y);

    // normally
    // ctx.drawImage(videoEl, 0, 0);

    // draw filter on top of image
    if(selectedFilterColor) {
        ctx.fillStyle = selectedFilterColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // get link of image from tool
    let url = canvas.toDataURL();

    // download process
    // let a = document.createElement("a");
    // a.href = url;
    // a.download = "image-capture.png";
    // a.click();
    // a.remove();

    // USE OF INDEXED DB TO STORE IMAGES
    addMediaToDB(url, "image");

    canvas.remove();

    // animation should not be removed abrubtly
    setTimeout(function () {
        captureBtn.classList.remove("capture-animation");
    }, 400);
});

// add filter to UI
filterContainer.addEventListener("click", function (e) {
    if(e.target.classList.contains("filter")) { 
        let bgColor = e.target.style.backgroundColor;
        if(bgColor) {
            uiFilter.classList.add("ui-filter-active");
            uiFilter.style.backgroundColor = bgColor;
            selectedFilterColor = bgColor;
        } else {
            uiFilter.classList.remove("ui-filter-active");
            uiFilter.style.backgroundColor = "";
            selectedFilterColor = "";
        }
    }
})

// zoom in/out UI feature
zoomContainer.addEventListener("click", function (e) {
    if(e.target.classList.contains("zoom-in")) {
        if(zoomLevel < 2) {
            zoomLevel += 0.35;

            // scale(-x,y) : to flip UI image horizontally during zoom as well 
            videoEl.style.transform = `scale(${-zoomLevel}, ${zoomLevel})`;
        }
    } else if(e.target.classList.contains("zoom-out")) {
        if(zoomLevel > 1) {
            zoomLevel -= 0.35;
            videoEl.style.transform = `scale(${-zoomLevel}, ${zoomLevel})`;
        }
    }
})