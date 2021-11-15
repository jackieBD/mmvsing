document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37:
      heroLeftPosition -= heroSpeed
      hero.style.left = heroLeftPosition + "px"
      break;

    case 39:
      heroLeftPosition += heroSpeed
      hero.style.left = heroLeftPosition + "px"
      break;
      default:
            break;
        }
      });


document.addEventListener("keydown", (event) => {
  switch (event.keyCode){
    case 38:
      heroTopPosition -= heroSpeed
      hero.style.top = heroTopPosition +"px"
      break;

    case 40:
    heroTopPosition += heroSpeed
      hero.style.top = heroTopPosition + "px"
      break;
    case 32:
      drawMud();
      break;

    default:
      break;
  }
});



function drawMud(){
  if (mudOnScreen = false){
  mudOnScreen = true
  mudPosLeft = heroLeftPosition
  mudPosTop = heroTopPosition
  mud.style.left = mudPosLeft + "px"
  mud.style.top = mudPosTop + "px"
  mud.style.display = "block"}
  else {
  mudOnScreen = false
  mud.style.left = mudPosLeft + "px"
  mud.style.top = mudPosTop + "px"
  mud.style.display = "block"}
}
