// Parse the current word
var divWord = document.getElementById("currentWord")

// Send appropriate message
if (divWord != null) {
    let word = divWord.textContent
    if (word.includes("_")) {
        // alert("NO")
        message = "<strong>Not Your Turn</strong>"
        chrome.runtime.sendMessage(message, function(response){
            console.log(response)
        });
    } else {
        word = "<strong>" + word + "</strong>"
        chrome.runtime.sendMessage(word, function(response){
            console.log(response)
        });
    }
} else {
    chrome.runtime.sendMessage("No Word", function(response){
        console.log(response)
    });
    console.log("Could not find the current word")
}
