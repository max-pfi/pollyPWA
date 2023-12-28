getData();

document.addEventListener("DOMContentLoaded", function () {

   document.getElementById("addPollForm").addEventListener("submit", function (event) { 
      event.preventDefault();
      var pollData = new FormData(event.target);
      user.userPolls.push(
      {
         "id": user.userPolls.length + 1,
         "question": pollData.get("question"),
         "color": pollData.get("color"),
         "answerOne": pollData.get("answerOne"),
         "answerTwo": pollData.get("answerTwo"),
         "userName": "John",
         "votesOne": 0,
         "votesTwo": 0
     });

     updateUser();
     parent.location = "index.html";
   });

   resetColors();
   document.getElementById("color2").style.border = "3px solid black";
});

function resetColors(){
   var colorList = document.getElementsByClassName("color");
   for(var i = 0; i < colorList.length; i++){
      colorList[i].style.border = "transparent";
   }

}

function selectColor(selectedColor){
   resetColors();
   selectedColor.style.border = "3px solid black";
   document.getElementById("selectedColorInput").value = window.getComputedStyle(selectedColor).backgroundColor;
   setInputFieldColor();
}

function setInputFieldColor(){
   var currentColor = document.getElementById("selectedColorInput").value;
   var inputFields = Array.from(document.getElementsByClassName("addPollInput"));
   inputFields.forEach(function(color) {
      color.style.backgroundColor = currentColor;
   })
}