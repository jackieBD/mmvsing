const hero = document.getElementById("hero")
const villain = document.getElementById("villain")
const mud = document.getElementById("mud")
const mmScoreBoard = document.getElementById('mm-score')
const ingScoreBoard = document.getElementById("ing-score")
const closeBtn = document.getElementById('closeBtn')
const modal = document.getElementById('modal')
const chatbox = document.getElementById('chatbox')
const messagel1 = document.getElementById('messagel1')
const messagel2 = document.getElementById('messagel2')
const finalscore = document.getElementById('finalscore')

const topBoarder = 0
const leftBoarder = 0
const bottomBoarder = 535
const rightBoarder = 734

let gameRunning = false

let paused = false

let mmScore = 0
let ingScore = 0

let heroSpeed = 3
let vilSpeed = 15
let vilSlow = 3

let heroLeftPosition = 380
let heroTopPosition = 420
let vilLeftPos = 380
let vilTopPos = 100
let vilTopChange = 0
let vilLeftChange = vilSpeed

let mudOnScreen = false
let mudPosTop = 900
let mudPosLeft = 900

function drawMud(){
  mudPosTop = heroTopPosition
  mudPosLeft = heroLeftPosition
  mud.style.display = "block"}


function mudSwitch(){
  mudOnScreen = !mudOnScreen
}

function boarders(){
if (heroLeftPosition >= rightBoarder){
  heroLeftPosition = rightBoarder
}
else if (heroLeftPosition <= leftBoarder){
    heroLeftPosition = leftBoarder
  }
if (heroTopPosition >= bottomBoarder){
      heroTopPosition = bottomBoarder
    }
else if (heroTopPosition <= topBoarder){
        heroTopPosition = topBoarder
}}



var keyMap = [];

document.addEventListener('keydown', (e)=>{
    if(!keyMap.includes(e.keyCode)){
        keyMap.push(e.keyCode);
    }
})

document.addEventListener('keyup', (e)=>{
    if(keyMap.includes(e.keyCode)){
        keyMap.splice(keyMap.indexOf(e.keyCode), 1);
    }
})

function key(x){
    return (keyMap.includes(x));
}

function checkGameKeys(){
    if(key(37)){
      heroLeftPosition -= heroSpeed
    }
    if(key(39)){
      heroLeftPosition += heroSpeed

    }
    if(key(38)){
      heroTopPosition -= heroSpeed

    }
    if(key(40)){
      heroTopPosition += heroSpeed
          }
}


document.addEventListener('keydown', (e)=>{
  if (e.keyCode = key(32)){
    drawMud()
  }
  if (e.keyCode = key(27)){
    if (paused === false){
      pauseGame()
    }
    else {
      unpauseGame()

    }



  }

})


function moveVillain(){
  if (vilLeftPos>= rightBoarder){
    vilLeftChange = -vilSpeed
    vilTopChange = Math.floor(Math.random() * vilSpeed + vilSlow) -(vilSpeed/2)

  }
  else if (vilLeftPos<= leftBoarder){
    vilLeftChange = vilSpeed
    vilTopChange = Math.floor(Math.random() * vilSpeed + vilSlow) -(vilSpeed/2)

  }
  else if (vilTopPos>= bottomBoarder){
    vilLeftChange = Math.floor(Math.random() * vilSpeed + vilSlow) -(vilSpeed/2)
    vilTopChange = -vilSpeed
  }
  else if (vilTopPos<= topBoarder){
    vilLeftChange = Math.floor(Math.random() * vilSpeed + vilSlow) -(vilSpeed/2)
    vilTopChange = vilSpeed


  }

}


function checkHit(){
  if (heroLeftPosition < vilLeftPos + 50 &&
    heroLeftPosition + 50 > vilLeftPos &&
    heroTopPosition < vilTopPos + 50 &&
    50 + heroTopPosition > vilTopPos) {

        ingScore++
      if(heroLeftPosition >= rightBoarder/2){
        heroLeftPosition = leftBoarder
      }
      else if(heroLeftPosition < rightBoarder/2){
        heroLeftPosition = rightBoarder
      }

      if(heroTopPosition < bottomBoarder/2){
        heroTopPosition = bottomBoarder
      }
      else if(heroTopPosition >= bottomBoarder/2){
        heroTopPosition = topBoarder
      }}
    }

function checkMudHit(){
  if (mudPosLeft < vilLeftPos + 40 &&
    mudPosLeft + 40 > vilLeftPos &&
    mudPosTop < vilTopPos + 40 &&
    40 + mudPosTop > vilTopPos) {
        mmScore ++
        mud.style.display = "none"
        mudPosLeft = 900
        mudPosTop = 900

      if(vilLeftPos >= rightBoarder/2){
        vilLeftChange = vilSlow
      }
      else if(vilLeftPos < rightBoarder/2){
        vilLeftChange = vilSlow * -1
      }

      if(vilTopPos < bottomBoarder/2){
        vilTopChange = vilSlow * -1
      }
      else if(vilTopPos >= bottomBoarder/2){
        vilTopChange = vilSlow
      }

}
}




closeBtn.addEventListener("click", function(){
  modal.style.display= "none"
  checkGame()
})

function gameLoop(){
  checkMudHit()
  moveVillain()
  boarders();
  checkGameKeys()
  checkHit()


  vilLeftPos += vilLeftChange
  vilTopPos += vilTopChange

  villain.style.left = vilLeftPos + "px"
  villain.style.top = vilTopPos + "px"

  hero.style.left = heroLeftPosition + "px"
  hero.style.top = heroTopPosition +"px"

  mud.style.left = mudPosLeft + "px"
  mud.style.top = mudPosTop + "px"

  mmScoreBoard.textContent = mmScore
  ingScoreBoard.textContent = ingScore
  window.requestAnimationFrame(gameLoop)

  if(ingScore>= 3){
    youLost()
  }
}


function checkGame(){
  if (gameRunning === false ){
  heroSpeed = 3
  vilSpeed = 15
  vilSlow = 3
  vilLeftChange = vilSpeed
  window.requestAnimationFrame(gameLoop)
  gameRunning = true
}

if (gameRunning){

  mmScore = 0
  ingScore = 0

  heroLeftPosition = 380
  heroTopPosition = 420
  vilLeftPos = 380
  vilTopPos = 100

  heroSpeed = 3
  vilSpeed = 15
  vilSlow = 3
  vilLeftChange = vilSpeed

  mudPosTop = 900
  mudPosLeft = 900
  mud.style.display = "none"
  hero.style.display = "block"
  villain.style.display = "block"


}
}


function youLost(){
  hero.style.display = "none"
  villain.style.display = "none"
  window.cancelAnimationFrame(window.requestAnimationFrame(gameLoop))

  modal.style.display = "block"
  closeBtn.style.display = "inline-block"
  chatbox.style.display = "none"

  messagel1.style.display = "block"
  messagel2.style.display = "block"
  finalscore.style.display = "block"

  finalscore.textContent = `Final Score: ${mmScore}`


  vilSpeed = 0
  vilSlow = 0
  heroSpeed = 0
  vilLeftChange = 0
  vilTopChange = 0





}

function pauseGame(){
  paused = true
  hero.style.display = "none"
  villain.style.display = "none"
  window.cancelAnimationFrame(window.requestAnimationFrame(gameLoop))

  modal.style.display = "block"
  messagel1.style.display = "none"
  messagel2.style.display = "none"
  finalscore.style.display = "none"

  closeBtn.style.display = "none"
  chatbox.style.display = "none"
  vilSpeed = 0
  vilSlow = 0
  heroSpeed = 0
  vilLeftChange = 0
  vilTopChange = 0


}



function unpauseGame(){
  modal.style.display = "none"


  hero.style.display = "block"
  villain.style.display = "block"

  paused = false

  heroSpeed = 3
  vilSpeed = 15
  vilSlow = 3
  vilLeftChange = vilSpeed
  vilTopChange = Math.floor(Math.random() * vilSpeed + vilSlow) -(vilSpeed/2)


}
