let timerInterval;
let remainingTime = 0;
let totalTimeUsed = 0;

const timeInput = document.getElementById('timeInput');
const countdown = document.getElementById('countdown');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const familyModeBtn = document.getElementById('familyModeBtn');
const focusModeBtn = document.getElementById('focusModeBtn');
const familyModeScreen = document.getElementById('familyModeScreen');
const totalUsageDisplay = document.getElementById('totalUsage');
const chime = document.getElementById('chime');

const quotes = [
  "The real world needs your presence.",
  "Disconnect to reconnect.",
  "Be where your feet are.",
  "Family is your true home.",
  "Technology can wait — love can't."
];

// Load previous usage
window.onload = () => {
  const savedTime = parseInt(localStorage.getItem('totalTimeUsed')) || 0;
  totalTimeUsed = savedTime;
  totalUsageDisplay.textContent = `Total Today: ${savedTime} minutes`;
};

// Format time
function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

// Start timer
startBtn.addEventListener('click', () => {
  const timeLimit = parseInt(timeInput.value);
  if (isNaN(timeLimit) || timeLimit <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  remainingTime = timeLimit * 60;
  countdown.textContent = formatTime(remainingTime);

  timerInterval = setInterval(() => {
    remainingTime--;
    countdown.textContent = formatTime(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      chime.play();
      alert("⏳ Time’s up! Go spend time with your family. 💖");

      totalTimeUsed += timeLimit;
      localStorage.setItem('totalTimeUsed', totalTimeUsed);
      totalUsageDisplay.textContent = `Total Today: ${totalTimeUsed} minutes`;

      activateFamilyMode();
    }
  }, 1000);
});

// Stop timer
stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
});

// Activate Family Mode
function activateFamilyMode() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  familyModeScreen.innerHTML = `
    <h2>👨‍👩‍👧‍👦 Family Mode On</h2>
    <p>${quote}</p>
    <button id="exitFamilyModeBtn">Exit Family Mode</button>
  `;
  familyModeScreen.classList.remove('hidden');
  setTimeout(() => familyModeScreen.classList.add('visible'), 50);
  document.body.style.backgroundColor = "#eaf5ea";

  document.getElementById('exitFamilyModeBtn').addEventListener('click', () => {
    familyModeScreen.classList.remove('visible');
    setTimeout(() => {
      familyModeScreen.classList.add('hidden');
      document.body.style.backgroundColor = "#f1f5f2";
    }, 500);
  });
}

// Manual activation
familyModeBtn.addEventListener('click', activateFamilyMode);

// Focus Mode
focusModeBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = "#dfe7fd";
  document.querySelector('.container').innerHTML = `
    <h2>Focus Mode</h2>
    <p>No distractions. Breathe and work in peace.</p>
    <button onclick="location.reload()">Exit Focus Mode</button>
  `;
});

// Schedule Family Mode at 8 PM
function scheduleFamilyMode(hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour);
  target.setMinutes(minute);
  target.setSeconds(0);

  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const timeout = target.getTime() - now.getTime();
  setTimeout(() => {
    activateFamilyMode();
    alert("⏰ It's 8 PM – Family Mode has been activated!");
  }, timeout);
}

scheduleFamilyMode(20, 0); // 8:00 PM
