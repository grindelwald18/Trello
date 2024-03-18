export function startClock() {
  function updateClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hoursElement = document.querySelector('#hours');
    const minutesElement = document.querySelector('#minutes');
    const secondsElement = document.querySelector('#seconds');
    if (seconds % 2 == 0) {
      secondsElement.classList.add('watch-seconds');
    } else {
      secondsElement.classList.remove('watch-seconds');
    }
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
  }
  setInterval(updateClock, 1000);
}
