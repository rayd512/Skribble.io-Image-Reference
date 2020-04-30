// chrome.runtime.onMessage.addListener(gotMessage);

// function gotMessage(request, sender, sendResponse) {
//     console.log(message.txt);
// }
// console.log("In content")
var divWord = document.getElementById("currentWord")
if (divWord != null) {
    let word = divWord.textContent
    if (word.includes("_")) {
        // alert("NO")
        chrome.runtime.sendMessage("Guessing", function(response){
            console.log("Sending message")
        });
    }
} else {
    console.log("Could not find the current word")
}
// alert("Content")