let interval
let timer
let duration
let start
let remaining
let perc

const inputWorking = document.querySelector('#working-time');
const inputBreak = document.querySelector('#break-time');
const inputLongBreak = document.querySelector('#long-break-time');

let workingSession = inputWorking.value;
let breakSession = inputBreak.value;
let longBreakSession = inputLongBreak.value;

inputWorking.addEventListener('change', updateValue);
inputBreak.addEventListener('change', updateValue);
inputLongBreak.addEventListener('change', updateValue);

let isOn = true
let rotate = 315

const audio = new Audio('assets/alarm.wav');
const btnStart = document.querySelector('.btn-start')
const btnStop = document.querySelector('.btn-stop')
const btnReset = document.querySelector('.btn-reset')
const display = document.querySelector('.timer')
const session = document.querySelector('.session')

let displayMinutes = workingSession < 10 ? "0" + workingSession : workingSession
display.innerHTML = `${displayMinutes}:00`

function updateValue() {
    workingSession = inputWorking.value;
    breakSession = inputBreak.value;
    longBreakSession = inputLongBreak.value;

    stopTimer()

    if (!isOn) {
        displayMinutes = breakSession < 10 ? "0" + breakSession : breakSession
        display.innerHTML = `${displayMinutes}:00`
    } else if (isOn) {
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

        timer -= 1
        rotate

        if (timer < 0) {
            toggleTimer()
            stopTimer()
            audio.play()

        }
    }, 1000);
}

// Exibição do tempo na tela
function displayTime() {
    let minutes, seconds, totalsecs, sec
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.innerHTML = `${minutes}:${seconds}`

    totalsecs = remaining
    if (seconds > 0) {
        perc = Math.ceil(((totalsecs - timer) / totalsecs) * 100);
        setProgress(perc);
    }
}

let countLongBreak = 0

// Alternar sessões
function toggleTimer() {
    if (isOn) {
        timer = breakSession
        session.innerHTML = 'Sessão de Intervalo'
        isOn = false
        countLongBreak++
        changeTheme(breakTheme)

        if (countLongBreak == 5) {
            timer = longBreakSession
            session.innerHTML = 'Sessão de Intervalo Longo'
            isOn = false
            countLongBreak = 0
            changeTheme(longBreakTheme)
        }

    } else if (isOn === false) {
        timer = workingSession
        session.innerHTML = 'Sessão de Trabalho'
        isOn = true
        changeTheme(workingTheme)
    }

    duration = 60 * timer
    remaining = duration

}

// Alterar cores
const root = document.querySelector(':root')

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)

const workingTheme = {
    bg: getStyle(root, "--bg"),
    menuUnderline: getStyle(root, "--menu-underline"),
    bgContainer: getStyle(root, "--bg-container"),
    text: getStyle(root, "--text"),
    modalBtn: getStyle(root, "--modal-btn"),
}

const breakTheme = {
    bg: "#F24B4B",
    menuUnderline: "#B33737",
    bgContainer: "#fd5b5b",
    modalBtn: "#E94B4B"
}

const longBreakTheme = {
    bg: "#0096c7",
    menuUnderline: "#023e8a",
    bgContainer: "#00b4d8",
    modalBtn: "#03045e"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const btnSett = document.querySelector('.config')

const changeTheme = (colors) => {
    Object.keys(colors).map(key => {
        root.style.setProperty(transformKey(key), colors[key])
    })
}


// Parar o Temporizador
btnStop.addEventListener('click', stopTimer)

function stopTimer() {
    timer = duration
    clearInterval(interval)
    setProgress(0)

    btnStart.classList.remove('btn-pause')
    btnStart.textContent = 'INICIAR'

    remaining = isOn ? 60 * workingSession : 60 * breakSession;
    

    if (!isOn) {
        displayMinutes = breakSession < 10 ? "0" + breakSession : breakSession
        display.innerHTML = `${displayMinutes}:00`
    } else if (isOn) {
        displayMinutes = workingSession < 10 ? "0" + workingSession : workingSession
        display.innerHTML = `${displayMinutes}:00`
    }

    btnStop.setAttribute("disabled", "disabled")
    btnReset.setAttribute("disabled", "disabled")
}

// Resetar o Temporizador
btnReset.addEventListener('click', resetTimer)
function resetTimer() {
    timer = duration
}

// Iniciar Temporizador
remaining = isOn ? 60 * workingSession : 60 * breakSession
duration = 60 * workingSession
// Alternar Start/Pause
btnStart.addEventListener('click', toggleStart)

function toggleStart() {
    btnStart.classList.toggle('btn-pause')

    if (btnStart.classList.contains('btn-pause') === false) {
        pauseTimer()
    } else {
        startTimer()
    }

    if (btnStart.textContent === 'INICIAR') {
        btnStart.textContent = 'PAUSAR'
    } else {
        btnStart.textContent = 'INICIAR'
    }


    // Pausar Temporizador
    function pauseTimer() {
        clearInterval(interval)
        let pause = Date.now();
        remaining = remaining - ((pause - start) / 1000)
    }


    function startTimer() {
        btnStop.removeAttribute('disabled')
        btnReset.removeAttribute('disabled')
        runTimer()
    }
}

