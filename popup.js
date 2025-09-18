const intervalInput = document.getElementById("interval");
const saveButton = document.getElementById("save");

// Load saved interval when popup opens
chrome.storage.sync.get(["intervalMinutes"], (result) => {
  intervalInput.value = result.intervalMinutes || 1; // default to 1 min for testing
});

// Save new interval
saveButton.addEventListener("click", () => {
  let val = parseInt(intervalInput.value);
  if (val >= 1 && val <= 180) {
    chrome.storage.sync.set({ intervalMinutes: val }, () => {
      saveButton.textContent = "Saved ✅";
      setTimeout(() => {
        saveButton.textContent = "Save";
      }, 1500);
    });
  } else {
    alert("Please enter a value between 1 and 180.");
  }
});
