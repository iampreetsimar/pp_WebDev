let openRequest = indexedDB.open("cameraApp", 1);
let db;

openRequest.onsuccess = function () {
    // if exists, get db 
    db = openRequest.result;
};

openRequest.onerror = function () {
    console.log(openRequest.error);
};

openRequest.onupgradeneeded = function () {
    // first time creation
    db = openRequest.result;
    db.createObjectStore("media", { keyPath: "mId" });
};

function addMediaToDB(data, type) {
    if(db) {
        let txn = db.transaction("media", "readwrite");
        let mediaStore = txn.objectStore("media");
        mediaStore.add({
            mId: Date.now(),
            type: type,
            data: data
        });
    } else {
        alert("Gallery is loading...");
    }
}