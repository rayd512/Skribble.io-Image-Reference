
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

    sendResponse({
        data: "I am fine, thank you. How is life in the background?"
    });
});
