const sessionTypeText = document.getElementById("sessionTypeText");

const sessionTypeInput = document.getElementById("sessionTypeInput");

const timerText = document.getElementById("timerText");

const timerInput = document.getElementById("timerInput");
const timerHoursInput = document.getElementById("timerHoursInput");
const timerMinutesInput = document.getElementById("timerMinutesInput");
const timerSecondsInput = document.getElementById("timerSecondsInput");

const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");
const editBtn = document.getElementById("editBtn");
const skipBtn = document.getElementById("skipBtn")
const confirmBtn = document.getElementById("confirmBtn");

let sessionString = 'WORK';
let timerString = '00:05:00';
let timer;

class Time {
    constructor(text) {
        const [hours, minutes, seconds] = timerText.textContent.split(':');

        this.hours = Number(hours);
        this.minutes = Number(minutes);
        this.seconds = Number(seconds);
    }

    isZero() {
        return (this.hours == 0 && this.minutes == 0 && this.seconds == 0) ? true : false;
    }

    getString() {
        const hoursString = this.hours.toString().padStart(2, '0');
        const minutesString = this.minutes.toString().padStart(2, '0');
        const secondsString = this.seconds.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}:${secondsString}`;
    }

    decrement() {
        if (this.seconds == 0 && this.minutes == 0 && this.hours == 0) return;

        if (this.seconds == 0 && this.minutes == 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
        }

        if (this.seconds == 0) {
            this.minutes--;
            this.seconds = 59;
        }

        this.seconds--;
    }
}

function startTimer() {
    startBtn.hidden = true;
    resumeBtn.hidden = true;
    stopBtn.hidden = false;
    editBtn.hidden = true;
    skipBtn.hidden = false;

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let time = new Time(timerText.textContent)

    time.decrement();

    timerText.textContent = time.getString();

    if (time.isZero()) initTimer();
}

function stopTimer() {
    clearInterval(timer);

    startBtn.hidden = true;
    resumeBtn.hidden = false;
    stopBtn.hidden = true;
    editBtn.hidden = true;
    skipBtn.hidden = false;
}

function skipTimer() {
    timerText.textContent = '00:00:00';
    updateTimer();
}

function editTimer() {
    sessionTypeInput.value = sessionTypeText.textContent;

    let time = new Time(timerText.textContent);

    timerHoursInput.value = time.hours.toString().padStart(2, '0');
    timerMinutesInput.value = time.minutes.toString().padStart(2, '0');
    timerSecondsInput.value = time.seconds.toString().padStart(2, '0');

    sessionTypeText.hidden = true;
    timerText.hidden = true;
    sessionTypeInput.hidden = false;
    timerInput.hidden = false;

    startBtn.hidden = true;
    resumeBtn.hidden = true;
    stopBtn.hidden = true;
    skipBtn.hidden = true;
    editBtn.hidden = true;
    confirmBtn.hidden = false;
}

function confirmTimer() {
    const hours = Number(timerHoursInput.value);
    const minutes = Number(timerMinutesInput.value);
    const seconds = Number(timerSecondsInput.value);

    if (hours < 0 || hours > 99) {
        window.alert('Invalid hours set');
        return;
    }

    if (minutes < 0 || minutes > 59) {
        window.alert('Invalid minutes set');
        return;
    }

    if (seconds < 0 || seconds > 59) {
        window.alert('Invalid seconds set');
        return;
    }

    sessionString = sessionTypeInput.value;

    const hoursString = timerHoursInput.value.padStart(2, '0');
    const minutesString = timerMinutesInput.value.padStart(2, '0');
    const secondsString = timerSecondsInput.value.padStart(2, '0');

    timerString = `${hoursString}:${minutesString}:${secondsString}`;

    initTimer();
}

function initTimer() {
    clearInterval(timer);

    sessionTypeInput.hidden = true;
    timerInput.hidden = true;

    sessionTypeText.hidden = false;
    timerText.hidden = false;

    sessionTypeText.textContent = sessionString;
    timerText.textContent = timerString;

    startBtn.hidden = false;
    resumeBtn.hidden = true;
    stopBtn.hidden = true;
    editBtn.hidden = false;
    skipBtn.hidden = true;
    confirmBtn.hidden = true;
}


initTimer();