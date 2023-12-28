var onFetched = () => {
    initializeProfileData();
}

getData(onFetched);

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("editProfileForm").addEventListener("submit", function (event) { 
        event.preventDefault();

        var userData = new FormData(event.target);
        user.name = userData.get("name");
        user.age = userData.get("age");
        user.description = userData.get("description");
        user.color = userData.get("color");
        user.icon = userData.get("icon").slice(-13);
        updateUser();
        parent.location = "profile.html";
    
    });   
});

function resetColors(){
    var colorList = document.getElementsByClassName("color");
    for(var i = 0; i < colorList.length; i++){
       colorList[i].style.border = "transparent";
    }
 
 }

 function resetIcons(){
    var iconList = document.getElementsByClassName("icon");
    for(var i = 0; i < iconList.length; i++){
       iconList[i].style.border = "transparent";
    }
 }

 function selectColor(selectedColor){
    resetColors();
    selectedColor.style.border = "3px solid white";
    document.getElementById("selectedColorInput").value = window.getComputedStyle(selectedColor).backgroundColor;
 }

 function selectIcon(selectedIcon){
    resetIcons();
    selectedIcon.style.border = "3px solid black";
    document.getElementById("selectedIconInput").value = selectedIcon.src;
 }

 function initializeProfileData(){
    var colorElement = getUserColorElement();
    selectColor(colorElement);
    var iconElement = getUserIconElement();
    selectIcon(iconElement);
    document.getElementById("nameInput").value = user.name;
    document.getElementById("ageInput").value = user.age;
    document.getElementById("description").value = user.description;
 }

 function getUserColorElement(){
    var colorElements = document.getElementsByClassName("color");
    for (var element of colorElements) {
        if (window.getComputedStyle(element).backgroundColor === user.color) {
            return element;
        }
    }
 }

function getUserIconElement(){
    var iconElements = document.getElementsByClassName("icon");
    for (var element of iconElements) {
        if (element.src.slice(-13) === user.icon) {
            return element;
        }
    }
}