var onFetched = () => {
    reloadPosts();
    setProfileData();
}

getData(onFetched);

function displayPosts(){
    var targetElement = document.getElementsByClassName('myposts')[0];
    var count = 0;
    
    user.userPolls.forEach(function (poll) {
        var votesPercentage = (poll.votesOne != 0 && poll.votesTwo != 0 && poll.votesOne != poll.votesTwo) ? (poll.votesTwo / (poll.votesOne + poll.votesTwo)) : 0.5;
        var postAnswer = poll.votesOne > poll.votesTwo ? poll.answerOne : poll.answerTwo;
        var textAlign = poll.votesOne > poll.votesTwo ? "left" : "right";
        var postHtml =
        `<div id=${count} class="myPost addPollContainer" style="background-color:${poll.color};">
            <div class="postHeader">
                <div class="postVotes">${poll.votesOne + poll.votesTwo + " votes"}</div>
                <img id=${"post" + count} src="img/delete.svg" alt="add poll" style="filter: invert(100%); width: 20px;" onClick="deletePost(${count})">
            </div>
            <div class="postDescription">${poll.question}</div>
            <hr class="line">
            <div class="verticalLine"></div>
            <div class="verticalLine result" style="left: calc(100vw * ${votesPercentage});"></div>
            <div class="postAnswer" style="text-align: ${textAlign};">${postAnswer}</div>
        </div>`;
        targetElement.insertAdjacentHTML('afterend', postHtml);
        count++;
    });
}

function deletePost(id) {
    user.userPolls.splice(id, 1);
    updateUser();
    reloadPosts();
}

function reloadPosts() {
    Array.from(document.getElementsByClassName("myPost")).forEach(function (post) {
        post.remove();
    });
    displayPosts();
}

function setProfileData() {
    Array.from(document.getElementsByClassName("colored")).forEach(function (element) {
        element.style.backgroundColor = user.color;
    });
    document.getElementById("profileIcon").src = user.icon;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("age").innerHTML = user.age;
    document.getElementById("description").innerHTML = user.description;
}