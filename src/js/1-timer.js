import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.addEventListener("DOMContentLoaded", function() {

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("[type='button']")
let userSelectedDate = null;
const selectedDates = input.value;

const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
  function addLeadingZero({ days, hours, minutes, seconds }) {
    daysSpan.textContent = String(days).padStart(2, "0");
    hoursSpan.textContent = String(hours).padStart(2, "0");
    minutesSpan.textContent = String(minutes).padStart(2, "0");
    secondsSpan.textContent = String(seconds).padStart(2, "0");
  }

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate.getTime() > new Date()) {
        button.disabled = false;
        button.classList.add("start");
      } else {
        iziToast.warning({
          title: 'Error',
          message: 'Please choose a date in the future!',
          position: 'topRight',
          timeout: 6000000,
      });
        button.disabled = true;
    }
    },
  }; 

const fp = flatpickr(input, options);

button.addEventListener("click", (evt) => {
    const interval = setInterval(()=>{
      const ms = userSelectedDate.getTime() - new Date().getTime();
      if (ms <= 0) {
        clearInterval(interval);
        addLeadingZero({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const time = convertMs(ms);
      addLeadingZero(time);
    }, 1000);
})
});
