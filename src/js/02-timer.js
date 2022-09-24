import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const startRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let currentTime = Date.now();
startRef.setAttribute('disabled', '');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentTime = selectedDates[0];
        daysRef.textContent = '00';
        hoursRef.textContent = '00';
        minutesRef.textContent = '00';
        secondsRef.textContent = '00';
        if (selectedDates[0] < new Date()) {
            window.alert('Please choose a date in the future');
        } else {
            startRef.removeAttribute('disabled');
        }
    },
};

flatpickr(input, options);

let intervalId = null;

startRef.addEventListener('click', () => {
    intervalId = setInterval(timer, 1000);
    startRef.setAttribute('disabled', '');
});

function timer() {
    const getTimeComponents = currentTime - new Date();
    if (getTimeComponents <= 0) {
        clearInterval(intervalId);
        return;
    }
    startRef.setAttribute('disabled', '');

    const { days, hours, minutes, seconds } = convertMs(getTimeComponents);
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, 0);
}