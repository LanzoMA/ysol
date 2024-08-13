const timerText = document.getElementById("timerText");
const skipBtn = document.getElementById("skipBtn");

timerText.textContent = '00:05:00';

skipBtn.hidden = true;

let timer;

function start() {
    timer = setInterval(updateTimer, 10);
}

function updateTimer() {
    let [hours, minutes, seconds] = timerText.textContent.split(':')

    if (seconds == 0 && minutes == 0 && hours == 0) {
        clearInterval(timer);
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


