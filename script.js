let interval
let timer
let duration

let workingSession = 25
let breakSession = 5
let isOn = true


const btnStart = document.querySelector('.btn-start')
const btnStop = document.querySelector('.btn-stop')
const circleRotate = document.querySelector('.circle2');
const display = document.querySelector('.timer')

let rotate = 315

function runTimer() {
    timer = duration
    
    // Rodando Temporizador
    interval = setInterval(() => {
        rotate
        displayTime()
        rotateTimer()
        timer -= 1

        if (timer < 0) {
            stopTimer()
        }
    }, 1000);    
}

// Exibição do tempo na tela
function displayTime() {
    let minutes, seconds
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.innerHTML = `${minutes}:${seconds}`
}


// Parar o Temporizador
btnStop.addEventListener('click', stopTimer)
function stopTimer() {
    clearInterval(interval)
    timer = duration
    displayTime()

    circleRotate.style.transform = "rotate(-45deg)"
    circleRotate.style.transition = "0s linear"
}

function rotateTimer() {
    circleRotate.style.transform = "rotate("+rotate+"deg)"
    circleRotate.style.transition = duration+"s linear"
    }

// Alternar sessões
function toggleTimer() {
    if(isOn) {
        timer = workingSession
        isOn = false
    } else if(isOn === false) {
        timer = breakSession
        isOn = true
    }

    duration = 60 * timer
}

btnStart.addEventListener('click', startTimer)

function startTimer() {
    toggleTimer()
    runTimer()
}


