let initComplete = false;
let onLoadComplete = false;

const onDataFeteched = () => {
    initComplete = true
    finishSetup()
}

getData(onDataFeteched)

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
    console.log("current card: ", currentCard)
    const cardData = pollList.find((poll) => {
        console.log("poll id: ", poll.id)
        return (poll.id == currentCard)
    })
    const voteCount = cardData.votesOne + cardData.votesTwo
    const voteCountString = voteCount + " votes"

    elements.bigCardName.textContent = cardData.userName;
    elements.bigCardVotes.textContent = voteCountString;
    elements.bigCardQuestion.textContent = cardData.question;
    elements.bigCardAnswerOne.textContent = cardData.answerOne;
    elements.bigCardAnswerTwo.textContent = cardData.answerTwo;
    elements.bigCard.style.background = cardData.color;
}

function addVote(voteOption) {
    pollList.forEach((poll) => {
        if (poll.id == currentCard) {
            if (voteOption == 1) {
                poll.votesOne++
                answerCardText.textContent = poll.answerOne
            } else {
                poll.votesTwo++
                answerCardText.textContent = poll.answerTwo
            }
            seenPolls.push(currentCard)
            updateLocalStorage()
            const voteCount = poll.votesOne + poll.votesTwo
            const votePercent = Math.round((voteOption == 1 ? poll.votesOne : poll.votesTwo) / voteCount * 100)
            answerCardPercent.textContent = votePercent + "%"
            if (votePercent > 50) {
                answerCardTag.textContent = "majority"
                answerCardTag.style.background = "rgb(101 129 35)"
            } else {
                answerCardTag.textContent = "minority"
                answerCardTag.style.background = "rgb(170 106 48)"
            }
            showAnswerCard(voteOption)
            return;
        }
    })
}

async function showAnswerCard(voteOption) {
    answerCard.style.display = "flex"
    bigCard.style.display = "none"
    setTimeout(function () {
        console.log("getting next card")
        getNextCard()
    }, 500);
}

function showQuestionCard() {
    answerCard.style.display = "none"
    bigCard.style.display = "flex"
}

function getNextCard() {
    pollList = shuffle(pollList)
    const nextPoll = pollList.find((poll, index) => { return !seenPolls.includes(poll.id) })
    if (nextPoll !== undefined) {
        console.log("next card: ", nextPoll.question)
        currentCard = nextPoll.id
        updateLocalStorage()
        setBigCardData()
        showQuestionCard()
        return
    }
}



//algorithm from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}





