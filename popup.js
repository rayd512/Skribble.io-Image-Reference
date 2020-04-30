
chrome.tabs.query({active: true, currentWindow: true}, gotTabs)

function gotTabs(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            "file": "content.js"
        }, function (response) { 
            console.log("Script Executed .. ");
            document.getElementById("Skribbl-word").innerHTML = response
        });
}

// function onReq(request, sender, sendResponse)
// {
//     console.log("msg: "+request);
//     document.getElementById("Skribbl-word").innerHTML = request;
// }

// chrome.runtime.onMessage.addListener(onReq);