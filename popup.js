// Global Variables
var data;
var currentImage;

// Find current tab and execute script
chrome.tabs.query({active: true, currentWindow: true}, gotTabs)

function gotTabs(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            "file": "content.js"
        }, function () { 
            console.log("Script Executed .. ");

        });
}


// Listen for message from content.js regarding current word to draw
// content.js will send the word, "No Word", or "Not Your Turn"
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Find the current word
    changeWord = document.getElementById("Skribbl-word").innerHTML
    console.log("Message recieved: " + message)
    document.getElementById("Skribbl-word").innerHTML = message
    // store("word", message)
    console.log("Getting Images")
    getImages(message)
    console.log("Set Image")
    sendResponse({
        data: "Got message"
    });
});

// Make a request to unsplash API to get images of the current word
function getImages(message) {
    // storedImage = get("image")
    let UNSPLASH_API_BASE = "https://api.unsplash.com/search/photos?client_id=<api_key>&query="
    var request = new XMLHttpRequest()
    var REQUEST_URL = UNSPLASH_API_BASE + message
    request.open('GET', REQUEST_URL, true)
    console.log("Opened Request")
    request.onload = function() {
        // Parse response
        data = JSON.parse(this.response)
        // Keep track of current image
        currentImage = 0;
        document.getElementById("reference").src = data.results[0].urls.regular;
        console.log("Element src set")
    }
    request.send()
}

// TO DO: implement storage functionality so when user clicks off extension to draw word
// if user is still drawing the same word, the same image will be displayed
// function store(key, value) {
//     chrome.storage.local.set({key: value}, function(data) {
//         console.log('Value is set to ' + value);
//       });
// }

// function get(key) {
//     chrome.storage.local.get([key], function(result) {
//         console.log('Value currently is ' + result.key);
//         return result;
//       });
// }

// Show next image and enable previous button if not at beginning
function next(prevButton, nextButton) {
    if (currentImage == 0) {
        prevButton.disabled = false;
    }
    currentImage++;
    document.getElementById("reference").src = data.results[currentImage].urls.regular;
}

// Show previous button and diable previous button if at beginning
function prev(prevButton, nextButton) {
    currentImage--;
    if (currentImage == 0) {
        button1.disabled = true
    }
    document.getElementById("reference").src = data.results[currentImage].urls.regular;
}

// Add listener to when buttons in popup are pressed
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

