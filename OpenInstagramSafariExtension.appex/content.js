browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationArr = window.location.pathname.split("/").reverse().filter(Boolean)
    if (locationArr[0] && !locationArr[1]) {
        window.location.href = `instagram://user?username=${locationArr[0]}`
    } else if (locationArr.includes("tags")) {
        window.location.href = `instagram://tag?name=${locationArr[0]}`
    } else if (locationArr.includes("p") || locationArr.includes("reel")) {
       window.location.href = document.querySelector("meta[property='al:ios:url']").getAttribute("content")
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();
