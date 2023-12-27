let initComplete = false;
let onLoadComplete = false;

const onDataFeteched = () => {
    initComplete = true
    finishSetup()
}

getData(onDataFeteched)

window.onload = function () {
    let ids = [
        "pinContainer",
        "noPinnedPolls"
    ];
    getElementsById(ids);
    onLoadComplete = true
    finishSetup()
}

function getElementsById(ids) {
    ids.forEach(id => {
        elements[id] = document.getElementById(id)
    })
}

function finishSetup() {
    if (!initComplete || !onLoadComplete) return
    seenPolls.sort((a, b) => new Date(b.time) - new Date(a.time));
    const seenPollIds = seenPolls.filter(poll => poll.pinned).map(poll => poll.id)
    if(seenPollIds.length == 0) {
        showNoPinnedPolls()
    }
    for(const seenPoll of seenPolls) {
        if(!seenPoll.pinned) continue
        for(const poll of pollList) {
            if(seenPoll.id == poll.id) {
                const smallPinContainer = createSmallPinContainer(poll)
                elements.pinContainer.appendChild(smallPinContainer)
            }
        }
    }
}

function showNoPinnedPolls() {
    elements.noPinnedPolls.style.display = 'flex'
    elements.pinContainer.style.display = 'none'
}

function removeNoPinnedPolls() {
    elements.noPinnedPolls.style.display = 'none'
    elements.pinContainer.style.display = 'flex'
}


function removeFromPinnedPolls(id) {
    for(const poll of seenPolls) {
        if(poll.id == id) {
            poll.pinned = false
            break
        }
    }
    const pinnedPoll = document.getElementById(id);
    if (pinnedPoll) {
        const parent = pinnedPoll.parentNode;
        parent.removeChild(pinnedPoll);
    }
    updateCards()
    if(seenPolls.filter(poll => poll.pinned).length == 0) {
        showNoPinnedPolls()
    }
}


function createSmallPinContainer(poll) {
    const smallPinContainer = document.createElement('div')
    const smallPinHeading = document.createElement('div')
    const smallPinName = document.createElement('div')
    const smallPinQuestion = document.createElement('div')
    const smallPinSlider = document.createElement('div')
    const sliderKnob = document.createElement('div')
    const smallPinAnswerContainer = document.createElement('div')
    const answer1 = document.createElement('div')
    const answer2 = document.createElement('div')
    const img = document.createElement('img')
    const smallPinHeadingLeft = document.createElement('div')
    const voteCount = document.createElement('div')

    smallPinContainer.className = 'smallPinContainer'
    smallPinContainer.id = poll.id
    smallPinHeading.className = 'smallPinHeading'
    smallPinName.className = 'smallPinName'
    smallPinQuestion.className = 'smallPinQuestion'
    smallPinSlider.className = 'smallPinSlider'
    sliderKnob.className = 'sliderKnob'
    smallPinAnswerContainer.className = 'smallPinAnswerContainer'

    smallPinContainer.style.backgroundColor = poll.color
    smallPinName.textContent = poll.userName
    smallPinQuestion.textContent = poll.question
    answer1.textContent = poll.answerOne
    answer2.textContent = poll.answerTwo
    voteCount.textContent = poll.votesOne + poll.votesTwo + ' votes'
    img.src = 'img/simple_pin_filled.svg'

    img.addEventListener('click', () => {
        removeFromPinnedPolls(poll.id)
    })

    const answerPercentage = poll.votesTwo / (poll.votesOne + poll.votesTwo)
    const answerPercentageString = answerPercentage * 100 + '%'

    sliderKnob.style.left = answerPercentageString

    smallPinHeadingLeft.appendChild(smallPinName)
    smallPinHeadingLeft.appendChild(voteCount)
    smallPinHeading.appendChild(smallPinHeadingLeft)
    smallPinHeading.appendChild(img)
    smallPinSlider.appendChild(sliderKnob)
    smallPinAnswerContainer.appendChild(answer1)
    smallPinAnswerContainer.appendChild(answer2)
    smallPinContainer.appendChild(smallPinHeading)
    smallPinContainer.appendChild(smallPinQuestion)
    smallPinContainer.appendChild(smallPinSlider)
    smallPinContainer.appendChild(smallPinAnswerContainer)

    return smallPinContainer
}