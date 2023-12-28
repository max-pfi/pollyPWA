/*  
AUTHORS: Müslüm Atas & Mathias Knoll
DESCRIPTION: The following code detects if the PWA is launched as an app or visited as a website.
SOURCE: https://stackoverflow.com/questions/50543163/can-i-detect-if-my-pwa-is-launched-as-an-app-or-visited-as-a-website
LAST CHANGE: 17.10.2023
*/

// Detects if device is on iOS
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if 'install popup notification' should be displayed
if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
}


let pollList = []
let seenPolls = []
let elements = {}
let currentCard = null
let user = null
let onDataFetched = null

const worker = new Worker("webworker.js")

async function getData(onDataFetchedCallback = null) {

    onDataFetched = onDataFetchedCallback

    if (localStorage.getItem("pollList") !== null
        && localStorage.getItem("currentCard") !== null
        && localStorage.getItem("seenPolls") !== null
        && localStorage.getItem("user") !== null) {
        getFromLocalStorage()

        if(onDataFetched !== null) 
            onDataFetched()
    } else {
        worker.postMessage("init")
    }

}

worker.onmessage = function (event) {
    pollList = event.data.polls
    user = event.data.user
    currentCard = 1
    seenPolls = []
    updateLocalStorage()
    onDataFetched()
}

function getFromLocalStorage() {
    pollList = JSON.parse(localStorage.getItem("pollList"));
    currentCard = parseInt(localStorage.getItem("currentCard"));
    seenPolls = JSON.parse(localStorage.getItem("seenPolls"));
    user = JSON.parse(localStorage.getItem("user"));
}

function updateUser() {
    localStorage.setItem("user", JSON.stringify(user))
}

function updateCards() {
    localStorage.setItem("seenPolls", JSON.stringify(seenPolls))
    localStorage.setItem("pollList", JSON.stringify(pollList))
    localStorage.setItem("currentCard", currentCard)
}

function updateLocalStorage() {
    localStorage.setItem("pollList", JSON.stringify(pollList))
    localStorage.setItem("currentCard", currentCard)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("seenPolls", JSON.stringify(seenPolls))
}


