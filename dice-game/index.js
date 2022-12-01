var randomNumber1 = Math.floor(Math.random() * 6) + 1
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

console.log(randomNumber1);

var imgsource1 = "images/dice" + randomNumber1 + ".png";
var imgsource2 = "images/dice" + randomNumber2 + ".png";

var img1 = document.querySelectorAll("img")[0];
var img2 = document.querySelectorAll("img")[1];

img1.setAttribute("src", imgsource1);
img2.setAttribute("src", imgsource2);

var h1 = document.querySelector("body h1")
if (randomNumber1 > randomNumber2){
    h1.innerHTML = "Player 1 Wins"
} else if (randomNumber1 > randomNumber2){
    h1.innerHTML = "Player 2 Wins"
} else {
    h1.innerHTML = "Tie" 
}