import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";  

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";  


const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDate = null;
let timerId = null;

startButton.disabled = true; 


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
          message: 'Please choose a date in the future',
        position: 'topCenter'
      });
      startButton.disabled = true; 
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false; 
    }
  },
};


flatpickr("#datetime-picker", options);


startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startButton.disabled = true; 
  document.querySelector('#datetime-picker').disabled = true; 
  timerId = setInterval(updateCountdown, 1000); 
});


function updateCountdown() {
  const now = new Date(); 
  const timeLeft = userSelectedDate - now; 

  
  if (timeLeft <= 0) {
    clearInterval(timerId); 
    document.querySelector('#datetime-picker').disabled = false; 
    startButton.disabled = true; 
    updateInterface(0, 0, 0, 0); 

    return;
  }
  
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateInterface(days, hours, minutes, seconds);
}


function updateInterface(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}