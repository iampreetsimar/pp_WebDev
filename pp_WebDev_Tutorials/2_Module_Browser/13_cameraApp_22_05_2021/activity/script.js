let videoEl = document.querySelector("#video-stream");
let recordBtn = document.querySelector("#record-btn");
let captureBtn = document.querySelector("#capture-btn");
let recordTime = document.querySelector(".record-time-container");

let buffer = [];
let constraints = { video: true, audio: true };
let mediaRecorder;
let recordState = false;
let clearTimerObject;

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
        let a = document.createElement("a");
        a.href = url;
        a.download = "file.mp4";
        a.click();

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

    // draw frame on canvas using drawImage
    ctx.drawImage(videoEl, 0, 0);

    // get link of image from tool
    let url = canvas.toDataURL();

    // download process
    let a = document.createElement("a");
    a.href = url;
    a.download = "image-capture.png";
    a.click();
    a.remove();
    canvas.remove();

    // animation should not be removed abrubtly
    setTimeout(function () {
        captureBtn.classList.remove("capture-animation");
    }, 400);
});


