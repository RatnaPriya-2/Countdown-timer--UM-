let dateInput = document.querySelector(".date-input"); // Select date input field
let timeInput = document.querySelector(".time-input"); // Select time input field
let startButton = document.querySelector(".start-btn"); // Select start button
let days = document.querySelector(".days p:first-of-type"); // First <p> inside .days (number)
let hours = document.querySelector(".hours p:first-of-type"); // First <p> inside .hours
let minutes = document.querySelector(".minutes p:first-of-type"); // First <p> inside .minutes
let seconds = document.querySelector(".seconds p:first-of-type"); // First <p> inside .seconds
let errorMessage = document.querySelector(".error-message"); // Error message container
let targetTimeDisplay = document.querySelector(".target-time-display"); // Section to show target time
let audioAlert = document.querySelector("audio"); // Audio element for alert sound

// Add leading zero to single-digit numbers (e.g., 7 -> "07")
const padZero = (num) => {
  return num.toString().padStart(2, "0");
};

// Convert milliseconds into days/hours/minutes/seconds
const getDisplayTime = (timeInMs) => {
  let displayDays = Math.floor(timeInMs / 24 / 60 / 60 / 1000); // Convert ms → days
  let displayHours = Math.floor(
    (timeInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000) // Remaining ms → hours
  );
  let displayMin = Math.floor((timeInMs % (60 * 60 * 1000)) / (60 * 1000)); // Remaining ms → minutes
  let displaySec = Math.floor((timeInMs % (60 * 1000)) / 1000); // Remaining ms → seconds

  return {
    displayDays: padZero(displayDays), // Add leading zero
    displayHours: padZero(displayHours),
    displayMin: padZero(displayMin),
    displaySec: padZero(displaySec),
  };
};

// Main countdown function
const startCountdown = () => {
  let dateValue = dateInput.value; // Read date
  let timeValue = timeInput.value; // Read time
  let targetTime = new Date(dateValue + "T" + timeValue).getTime(); // Convert to timestamp (ms)

  // Validation: Check if both fields are filled
  if (!dateValue || !timeValue) {
    errorMessage.classList.add("show");
    errorMessage.innerText = "Please enter both date and time!";
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 1500);
    return;
  }

  // Validation: Check if valid future date & time
  if (isNaN(targetTime) || targetTime <= new Date().getTime()) {
    errorMessage.classList.add("show");
    errorMessage.innerText = "Please enter a valid future date and time!";
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 1500);
    return;
  }

  // Start the countdown interval
  let timeInterval = setInterval(() => {
    let dateNowInMs = new Date().getTime(); // Current time in ms
    let remainingTimeInMs = targetTime - dateNowInMs; // Calculate time left
    let finalTime = getDisplayTime(remainingTimeInMs); // Convert to readable parts

    // Update UI with countdown values
    days.innerText = finalTime.displayDays;
    hours.innerText = finalTime.displayHours;
    minutes.innerText = finalTime.displayMin;
    seconds.innerText = finalTime.displaySec;

    // Display the selected target time
    targetTimeDisplay.innerText = ` ${new Date(targetTime).toLocaleString()}`;

    // Clear user inputs after starting countdown
    dateInput.value = "";
    timeInput.value = "";

    // When countdown ends: stop timer and set all values to 0
    if (remainingTimeInMs <= 0) {
      clearInterval(timeInterval);
      days.innerText = "00";
      hours.innerText = "00";
      minutes.innerText = "00";
      seconds.innerText = "00";
      audioAlert.play(); // Play alert sound
    }
  }, 1000); // Update every 1 second
};

// Start countdown when button is clicked
startButton.addEventListener("click", startCountdown);
// Button press animation

startButton.addEventListener("mousedown", () => {
  startButton.classList.add("active");
});

startButton.addEventListener("mouseup", () => {
  startButton.classList.remove("active");
});

startButton.addEventListener("mouseleave", () => {
  startButton.classList.remove("active");
});
