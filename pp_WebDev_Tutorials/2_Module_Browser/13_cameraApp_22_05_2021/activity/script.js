let videoEl = document.querySelector("#video-stream");
let recordBtn = document.querySelector("#record-btn");
let captureBtn = document.querySelector("#capture-btn");

let buffer = [];
let constraints = { video: true, audio: true };
let mediaRecorder;
let recordState = false;

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
        recordBtn.innerText = "Recording..";
        mediaRecorder.start();
        recordState = true;
    } else {
        recordBtn.innerText = "Record";
        mediaRecorder.stop();
        recordState = false;
    }
})

captureBtn.addEventListener("click", function () {
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
})
