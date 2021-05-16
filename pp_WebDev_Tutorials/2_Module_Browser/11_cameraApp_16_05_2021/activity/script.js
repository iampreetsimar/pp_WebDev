let videoEl = document.querySelector("#video-stream");
let recordBtn = document.querySelector("#record-btn");

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
