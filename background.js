// let word = document.getElementById(currentWord)

// alert(word)
console.log("running")

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let msg = {
        txt: "hello"
    };
    chrome.tabs.sendMessage(tab.id, msg);
}