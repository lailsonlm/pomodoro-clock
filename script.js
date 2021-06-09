let interval
let timer = 25

function runTimer(duration, display) {
    timer = duration
    let minutes, seconds

    interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.innerHTML = `${minutes}:${seconds}`
        timer -= 1

        if (timer < 0) {
            clearInterval(interval)

            if (duration != 300) {
                duration = 300
                timer = duration / 60
                minutes = parseInt(duration / 60, 10)
                seconds = parseInt(duration % 60, 10)

                minutes = minutes < 10 ? "0" + minutes : minutes
                seconds = seconds < 10 ? "0" + seconds : seconds

                display.innerHTML = `${minutes}:${seconds}`
            }
        }
    }, 1000);

    const btnStop = document.querySelector('.btn-stop')

    btnStop.addEventListener('click', stopTimer)
    function stopTimer() {
        clearInterval(interval)
        timer = duration / 60

        minutes = parseInt(duration / 60, 10)
        seconds = parseInt(duration % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.innerHTML = `${minutes}:${seconds}`
    }
}

const btnStart = document.querySelector('.btn-start')
btnStart.addEventListener('click', startTimer)

function startTimer() {
    const duration = 60 * timer

    const display = document.querySelector('.timer')
    runTimer(duration, display)
}


