
chrome.tabs.query({active: true, currentWindow: true}, gotTabs)

function gotTabs(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            "file": "content.js"
        }, function () { 
            console.log("Script Executed .. ");

        });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    changeWord = document.getElementById("Skribbl-word").innerHTML
    console.log("Message recieved: " + message)
    // if (message == "guessing") {
    //     changeWord = "Not your turn"
    // } else if (message == "no_word") {
    //     changeWord = "No word found"
    // } else {
    //     changeWord = word
    // }
    document.getElementById("Skribbl-word").innerHTML = message
    console.log("Getting Images")
    getImages(message)
    console.log("Set Image")
    sendResponse({
        data: "Got message"
    });
});

function getImages(message) {
    let UNSPLASH_API_BASE = "https://api.unsplash.com/search/photos?client_id=HLccHhMKXhvNVrUpI97pzEpg_jABsIxp_MWGVXv6hmU&query="
    var request = new XMLHttpRequest()
    var REQUEST_URL = UNSPLASH_API_BASE + message
    request.open('GET', REQUEST_URL, true)
    console.log("Opened Request")
    // console.log(JSON.parse(this.response))
    request.onload = function() {
        var data = JSON.parse(this.response)
        document.getElementById("reference").src = data.results[0].urls.regular;
        console.log("Element src set")
    }
    request.send()
}