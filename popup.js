var data;
var currentImage;
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
        data = JSON.parse(this.response)
        currentImage = 0;
        document.getElementById("reference").src = data.results[0].urls.regular;
        console.log("Element src set")
    }
    request.send()
}

function next(prevButton, nextButton) {
    if (currentImage == 0) {
        prevButton.disabled = false;
    }
    currentImage++;
    document.getElementById("reference").src = data.results[currentImage].urls.regular;
}

function prev(prevButton, nextButton) {
    currentImage--;
    if (currentImage == 0) {
        button1.disabled = true
    }
    document.getElementById("reference").src = data.results[currentImage].urls.regular;
}

document.addEventListener('DOMContentLoaded', function() {
    var prevButton = document.getElementById("button1")
    var nextButton = document.getElementById("button2")

    nextButton.addEventListener("click", function() {
        console.log("Next")
        next(prevButton, nextButton)
    })

    prevButton.addEventListener("click", function() {
        console.log("Prev")
        prev(prevButton, nextButton)
    })
})

