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
        let currentVideoCount = await scrollToBottom(tab, "#contents > ytd-playlist-video-renderer");
        while(totalVideoCount - 20 > currentVideoCount) {
            currentVideoCount = await scrollToBottom(tab, "#contents > ytd-playlist-video-renderer");
        }
        await scrollToBottom(tab, "#contents > ytd-playlist-video-renderer");

        playlistObject.videoDetails = await tab.evaluate(getVideoDetails, 
        "#contents > ytd-playlist-video-renderer",
        "#video-title",
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

function getVideoDetails(cardSelector, videoTitleSelector, videoRuntimeSelector) {
    let cards = document.querySelectorAll(cardSelector);
    //let videoTitles = document.querySelectorAll(videoTitleSelector);
    //let videoRuntimes = document.querySelectorAll(videoRuntimeSelector);
    let videoArr = [];
    for(let i = 0; i < cards.length; i++) {
        if(cards[i]) {
            let videoTitle = cards[i].querySelector(videoTitleSelector);
            let videoRuntime = cards[i].querySelector(videoRuntimeSelector);
            if(videoTitle && videoRuntime) {
                videoTitle = videoTitle.innerText.trim();
                videoRuntime = videoRuntime.innerText.trim();
                videoArr.push({
                    title: videoTitle,
                    runtime: videoRuntime
                });
            }
        }
    }

    return videoArr;
}

async function scrollToBottom(tab, cardSelector) {
    function getVideoCount(cardSelector) {
        window.scrollBy(0, window.innerHeight);
        let cardElemArr = document.querySelectorAll(cardSelector);
        return cardElemArr.length;
    }

    return tab.evaluate(getVideoCount, cardSelector);
}

console.log("After");

