let timerDisplay = document.getElementById("timer");
let micButton = document.getElementById("micButton");
let typedInput = document.getElementById("typedInput");
let resultDisplay = document.getElementById("result");

let timer = 3;
let greetingStarted = false;
let timerStarted = false;

function startTimer() {
    if (timerStarted) return;
    timerStarted = true;
    let countdown = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            if (!greetingStarted) {
                resultDisplay.textContent = "❌ You did not start your greeting in time.";
            }
        }
    }, 1000);
}

function markGreetingStarted() {
    if (!greetingStarted && timer > 0) {
        greetingStarted = true;
        resultDisplay.textContent = "✅ Greeting started on time!";
    }
}

typedInput.addEventListener("input", () => {
    markGreetingStarted();
});

micButton.addEventListener("click", () => {
    markGreetingStarted();
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        typedInput.value = transcript;
        resultDisplay.textContent = "✅ Greeting started on time (via voice): " + transcript;
    };
});

window.onload = startTimer;
