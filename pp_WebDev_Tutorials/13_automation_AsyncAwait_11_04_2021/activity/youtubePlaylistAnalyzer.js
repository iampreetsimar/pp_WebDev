/*
    Fetch -
        Number of videos
        Total views on the playlist
        Total watch time
        List of videos stored in excel/json
*/



let puppeteer = require("puppeteer");
console.log("Before");

(async function() {
    try {
        let browserInstance = await puppeteer.launch({ 
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
    
        let tab = await browserInstance.pages();
        tab = tab[0];

        // no copyright music playlist url
        await tab.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq");

        // returns total videos and total runtime in an object
        let playlistObject = await tab.evaluate(getStaticDetails, 
            "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
        console.log(playlistObject);

        let totalVideoCount = Number(playlistObject.videos.split(" ")[0]);
        let currentVideoCount = await scrollToBottom(tab, "#video-title");
        while(totalVideoCount - 20 > currentVideoCount) {
            currentVideoCount = await scrollToBottom(tab, "#video-title");
        }
        await scrollToBottom(tab, "#video-title");

        playlistObject.videoDetails = await tab.evaluate(getVideoDetails, "#video-title",
        "span.style-scope.ytd-thumbnail-overlay-time-status-renderer");

        console.table(playlistObject.videoDetails);
        
        // close browser instance
        console.log("... closing Browser Instance Closed");
        await browserInstance.close();
    } catch(err) {
        console.log(err);
    }
})();

function getStaticDetails(totalVideosSelector) {
    let playlist = document.querySelectorAll(totalVideosSelector);
    let totalVideos = playlist[0].innerText;
    let totalViews = playlist[1].innerText;

    let detailObject = {
        videos: totalVideos,
        views: totalViews
    }

    return detailObject;
}

function getVideoDetails(videoTitleSelector, videoRuntimeSelector) {
    let videoTitles = document.querySelectorAll(videoTitleSelector);
    let videoRuntimes = document.querySelectorAll(videoRuntimeSelector);
    let videoArr = [];
    for(let i = 0; i < videoTitles.length; i++) {
        if(videoTitles[i] && videoRuntimes[i]) {
            let videoTitle = videoTitles[i].innerText.trim();
            let videoRuntime = videoRuntimes[i].innerText.trim();
            videoArr.push({
                title: videoTitle,
                runtime: videoRuntime
            });
        }
    }

    return videoArr;
}

async function scrollToBottom(tab, titleSelector) {
    function getVideoCount(titleSelector) {
        window.scrollBy(0, window.innerHeight);
        let titleElemArr = document.querySelectorAll(titleSelector);
        return titleElemArr.length;
    }

    return tab.evaluate(getVideoCount, titleSelector);
}

console.log("After");

