let interval
let timer
let duration
let start
let remaining

const inputWorking = document.querySelector('#working-time');
const inputBreak = document.querySelector('#break-time');

let workingSession = inputWorking.value;
let breakSession = inputBreak.value;



inputWorking.addEventListener('change', updateValue);
inputBreak.addEventListener('change', updateValue);

let isOn = true
let rotate = 315

const audio = new Audio('assets/alarm.wav');
const btnStart = document.querySelector('.btn-start')
const btnStop = document.querySelector('.btn-stop')
const btnReset = document.querySelector('.btn-reset')
const circleRotate = document.querySelector('.circle2');
const display = document.querySelector('.timer')
const session = document.querySelector('.session')

let displayMinutes = workingSession < 10 ? "0" + workingSession : workingSession
display.innerHTML = `${displayMinutes}:00`

function updateValue() {
    workingSession = inputWorking.value;
    breakSession = inputBreak.value;

    stopTimer()

    if(!isOn) {
        displayMinutes = breakSession < 10 ? "0" + breakSession : breakSession
        display.innerHTML = `${displayMinutes}:00`
    } else if(isOn) {
        displayMinutes = workingSession < 10 ? "0" + workingSession : workingSession
        display.innerHTML = `${displayMinutes}:00`
    }

    remaining = isOn ? 60 * workingSession : 60 * breakSession
    duration = 60 * workingSession
     
}


function runTimer() {
    timer = remaining

    start = Date.now();
    
    // Rodando Temporizador
    interval = setInterval(() => {
        displayTime()
        rotateTimer()
        timer -= 1
        rotate
        
        if (timer < 0) {
            toggleTimer()
            stopTimer()
            audio.play();
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
    circleRotate.style.transition = remaining+"s linear"
}

// Alternar sessões
function toggleTimer() {
    if(isOn) {
        timer = breakSession
        session.innerHTML = 'Sessão de Intervalo'
        isOn = false
    } else if(isOn === false) {
        timer = workingSession
        session.innerHTML = 'Sessão de Trabalho'
        isOn = true
    }

    duration = 60 * timer
    remaining = duration
}

// Parar o Temporizador
btnStop.addEventListener('click', stopTimer)
function stopTimer() {
    timer = duration
    clearInterval(interval)

    btnStart.classList.remove('btn-pause')
    btnStart.textContent = 'INICIAR'

    remaining = isOn ? 60 * workingSession : 60 * breakSession;
    displayTime()

    circleRotate.style.transform = "rotate(-45deg)"
    circleRotate.style.transition = "0s linear"

    btnStop.setAttribute("disabled", "disabled")
    btnReset.setAttribute("disabled", "disabled") 
}

// Resetar o Temporizador
btnReset.addEventListener('click', resetTimer)
    function resetTimer() {
        timer = duration

        circleRotate.style.transform = "rotate(-45deg)"
        circleRotate.style.transition = "0s linear"
    }

// Iniciar Temporizador
remaining = isOn ? 60 * workingSession : 60 * breakSession
duration = 60 * workingSession
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


    // Pausar Temporizador
    function pauseTimer() {
        clearInterval(interval)
        let pause = Date.now();
        remaining = remaining - ((pause - start)/1000)
        circleRotate.style.transform = "rotate(-45deg)"
        circleRotate.style.transition = "0s linear"
    }


    function startTimer() {
        btnStop.removeAttribute('disabled')
        btnReset.removeAttribute('disabled') 
        runTimer()
    }
}

