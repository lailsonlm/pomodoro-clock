let interval
let timer
let duration
let start
let remaining

let workingSession = 0.5
let breakSession = 0.2
let isOn = false


const btnStart = document.querySelector('.btn-start')
const btnStop = document.querySelector('.btn-stop')
const btnReset = document.querySelector('.btn-reset')
const btnPause = document.querySelector('.btn-pause')
const circleRotate = document.querySelector('.circle2');
const display = document.querySelector('.timer')

let rotate = 315

function runTimer() {
    timer = remaining
    duration = remaining
    
    // Rodando Temporizador
    interval = setInterval(() => {
        rotate
        displayTime()
        rotateTimer()
        timer -= 1

        if (timer < 0) {
            toggleTimer()
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

// Rodar circulo com cronômetro
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
    remaining = duration
}

// Parar o Temporizador
btnStop.addEventListener('click', stopTimer)
function stopTimer() {
    clearInterval(interval)

    btnStart.classList.remove('btn-pause')
    btnStart.textContent = 'INICIAR'

    timer = remaining
    displayTime()

    circleRotate.style.transform = "rotate(-45deg)"
    circleRotate.style.transition = "0s linear"

    btnStop.setAttribute("disabled", "disabled")
    btnReset.setAttribute("disabled", "disabled") 
}

// Resetar o Temporizador
btnReset.addEventListener('click', resetTimer)
    function resetTimer() {
        timer = remaining

        circleRotate.style.transform = "rotate(-45deg)"
        circleRotate.style.transition = "0s linear"
    }

// Alternar Start/Pause
btnStart.addEventListener('click', toggleStart)
function toggleStart() {
    btnStart.classList.toggle('btn-pause')
    if(btnStart.classList.contains('btn-pause') === false) {
        pauseTimer()
    } else {
        startTimer()
    }

    if(btnStart.textContent === 'INICIAR') {
        btnStart.textContent = 'PAUSAR'
    } else {
        btnStart.textContent = 'INICIAR'
    }
}
// Pausar Temporizador
function pauseTimer() {
        clearInterval(interval)
        let pause = Date.now();
        remaining = remaining - ((pause - start)/1000)
}

// Iniciar Temporizador
remaining = 60 * workingSession
function startTimer() {
    btnStop.removeAttribute('disabled')
    btnReset.removeAttribute('disabled') 
    start = Date.now();
    runTimer()
}


