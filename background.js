// Default interval (in minutes)
let intervalMinutes = 1; // 1 minute for testing
let timerId;

function showNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "🐢 Posture Pal Reminder",
    message: "Time to check your posture! Sit up straight and take a quick break.",
    priority: 2
  });
}

function startTimer() {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(showNotification, intervalMinutes * 60 * 1000);
}

// Load saved interval from storage or use default
chrome.storage.sync.get(["intervalMinutes"], (result) => {
  if (result.intervalMinutes) {
    intervalMinutes = result.intervalMinutes;
  }
  startTimer();
});

// Listen for changes from popup and reset timer
chrome.storage.onChanged.addListener((changes) => {
  if (changes.intervalMinutes) {
    intervalMinutes = changes.intervalMinutes.newValue;
    startTimer();
  }
});
