let timerDisplay = document.getElementById('timer');
let startPauseBtn = document.getElementById('startPause');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let clearLapsBtn = document.getElementById('clearLaps');
let lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const totalSeconds = elapsedTime / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds * 10) % 10);

  timerDisplay.textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
}

startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 100);
    startPauseBtn.textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(intervalId);
    startPauseBtn.textContent = 'Start';
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  timerDisplay.textContent = "00:00.0";
  elapsedTime = 0;
  isRunning = false;
  startPauseBtn.textContent = 'Start';
});

lapBtn.addEventListener('click', () => {
  if (elapsedTime === 0) return;
  const lapTime = timerDisplay.textContent;
  const lapDiv = document.createElement('div');
  lapDiv.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapDiv);
});

clearLapsBtn.addEventListener('click', () => {
  lapsContainer.innerHTML = '';
});
