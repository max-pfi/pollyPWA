let pollList = []
let elements = {}
let currentCard = null;
let initComplete = false;
let onLoadComplete = false;

const worker = new Worker("webworker.js")

// setup: take data from localstorage or use worker to fetch data from file
if (localStorage.getItem("pollList") !== null && localStorage.getItem("currentCard") !== null) {
    pollList = JSON.parse(localStorage.getItem("pollList"))
    currentCard = localStorage.getItem("currentCard")
    initComplete = true
    finishSetup()
} else {
    worker.postMessage("init")
}

// after init from worker is done
worker.onmessage = function (event) {
    pollList = event.data
    currentCard = 0
    updateLocalStorage()
    initComplete = true
    finishSetup()
}

window.onload = function () {
    let ids = [
        "bigCard",
        "bigCardName",
        "bigCardVotes",
        "bigCardPinButton",
        "bigCardQuestion",
        "bigCardAnswerOne",
        "bigCardAnswerTwo",
        "skipButton", "answerCard",
        "answerCardText",
        "answerCardTag",
        "answerCardPercent",
        "cardId"];
    getElementsById(ids);
    onLoadComplete = true
    finishSetup()
}

function finishSetup() {
    if (!initComplete || !onLoadComplete) return
    elements.bigCardAnswerOne.addEventListener("click", function () { addVote(1) })
    elements.bigCardAnswerTwo.addEventListener("click", function () { addVote(2) })
    setBigCardData()
}

function getElementsById(ids) {
    ids.forEach(id => {
        elements[id] = document.getElementById(id)
    })
}

function setBigCardData() {
    const voteCount = pollList[currentCard].votesOne + pollList[currentCard].votesTwo
    const voteCountString = voteCount + " votes"
    elements.bigCardName.textContent = pollList[currentCard].userName;
    elements.bigCardVotes.textContent = voteCountString;
    elements.bigCardQuestion.textContent = pollList[currentCard].question;
    elements.bigCardAnswerOne.textContent = pollList[currentCard].answerOne;
    elements.bigCardAnswerTwo.textContent = pollList[currentCard].answerTwo;
}

function addVote(voteOption) {
    pollList.forEach((poll) => {
        if (poll.id === pollList[currentCard].id) {
            if (voteOption === 1) {
                poll.votesOne++
                answerCardText.textContent = poll.answerOne
            } else {
                poll.votesTwo++
                answerCardText.textContent = poll.answerTwo
            }
            updateLocalStorage()
            const voteCount = poll.votesOne + poll.votesTwo
            const votePercent = Math.round((voteOption === 1 ? poll.votesOne : poll.votesTwo) / voteCount * 100)
            answerCardPercent.textContent = votePercent + "%"
            if(votePercent > 50) {
                answerCardTag.textContent = "majority"
            } else {
                answerCardTag.textContent = "minority"
            }
            showAnswerCard(voteOption)
            return;
        }
    })
}

function showAnswerCard(voteOption) {
    bigCard.classList.remove("displayFlex");
    bigCard.classList.add("displayNone");
    answerCard.classList.remove("displayNone");
    answerCard.classList.add("displayFlex");
}

function updateLocalStorage() {
    localStorage.setItem("pollList", JSON.stringify(pollList))
    localStorage.setItem("currentCard", currentCard)
}






