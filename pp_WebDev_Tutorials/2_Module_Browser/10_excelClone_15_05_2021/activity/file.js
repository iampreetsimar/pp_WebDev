let downloadFileButton = document.querySelector(".download-file");
let openFileButton = document.querySelector(".open-file");
let newFileButton = document.querySelector(".new-file");

downloadFileButton.addEventListener("click", downloadFile);

function downloadFile() {
    // for text, convert to JSON | for other files -> directly convert to blob
    const data = JSON.stringify(workbookDB);

    // from JSON - use blob and appropriate mime type
    const blob = new Blob([data], { type: "application/json" });

    // converts file to a URL
    const url = window.URL.createObjectURL(blob);

    // to download
    let anchor = document.createElement("a");
    anchor.download = "file.json";
    anchor.href = url;
    anchor.click();
}