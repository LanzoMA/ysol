const timerText = document.getElementById("timerText");

const sessionTypeInput = document.getElementById("sessionTypeInput");
const timerInput = document.getElementById("timerInput");

sessionTypeInput.hidden = true;
timerInput.hidden = true;

const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");
const editBtn = document.getElementById("editBtn");
const skipBtn = document.getElementById("skipBtn");

let timer;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
    startBtn.hidden = true;
    stopBtn.hidden = false;
    editBtn.hidden = true;
    skipBtn.hidden = false;
}

function updateTimer() {
    let [hours, minutes, seconds] = timerText.textContent.split(':')

    if (seconds == 0 && minutes == 0 && hours == 0) {
        clearInterval(timer);
        resetTimer();
        return;
    }

    if (seconds == 0 && minutes == 0 && hours != 0) {
        hours--;
        minutes = 59;
        seconds = 59;
    }

    if (seconds == 0) {
        minutes--;
        seconds = 59;
    }

    if (seconds != 0) seconds--;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    timerText.textContent = `${hours}:${minutes}:${seconds}`;
}

function resumeTimer() {
    timer = setInterval(updateTimer, 1000);

    resumeBtn.hidden = true;
    stopBtn.hidden = false;
}

function stopTimer() {
    clearInterval(timer);

    stopBtn.hidden = true;
    resumeBtn.hidden = false;
}

function skipTimer() {
    timerText.textContent = '00:00:00';
    updateTimer();
}

function resetTimer() {
    timerText.textContent = '00:05:00';

    startBtn.hidden = false;
    resumeBtn.hidden = true;
    stopBtn.hidden = true;
    editBtn.hidden = false;
    skipBtn.hidden = true;
}

resetTimer();