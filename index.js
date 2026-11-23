// VARIABLES & ELEMENTS
const GAME_SECONDS = 48 * 60 * 1000;

const timerEl = document.getElementById("game-time");
let timerId = null;
let remaining = GAME_SECONDS;
let endTime = null
renderTime();

const leaderEl = document.getElementById("leader");

const homeScoreEl = document.getElementById("home-score");
let homeScore = 0;
const guestScoreEl = document.getElementById("guest-score");
let guestScore = 0;

const timerControlBtn = document.getElementById("toggle-btn");

// TIMER UTILITIES
function formatTime(currTime) {
    const totalSeconds = Math.ceil(remaining / 1000);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
    
    return `${mm}:${ss}`;
}

function renderTime() {
    timerEl.textContent = formatTime(remaining);
}

function updateTimer() {
    remaining = Math.max(0, endTime - performance.now());
    
    if (remaining == 0) {
        clearInterval(timerId);
        timerId = null;
        resetStart();
    }
    
    renderTime();
}

function resetTimer(resetType) {
    clearInterval(timerId);
    timerId = null
    if (resetType === "HARD") remaining = GAME_SECONDS;
    renderTime()
}

// LEADERBOARD UTILITIES
function printLeader() {
    if (homeScore > guestScore) {
        leaderEl.textContent = "Lead : HOME"
    } else if (homeScore < guestScore) {
        leaderEl.textContent = "Lead : GUEST"
    } else {
        leaderEl.textContent = "Lead : TIE"
    }
}

function resetLeader() {
    printLeader();
}

// SCOREBOARD UTILITIES
function incrementScore(side, points) {
    if (timerId === null) return
    
    if (side === 'HOME') {
        homeScore += points
        homeScoreEl.textContent = homeScore
    } else {
        guestScore += points
        guestScoreEl.textContent = guestScore
    }
    
    printLeader();
}

function resetScore() {
    homeScore = 0;
    guestScore = 0;
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
}

// START/PAUSE AND RESET BUTTON UTILITIES
const BTN_STATE_ENUM = { START : "start", PAUSE : "pause" }

function toggleClasses() {
    timerControlBtn.classList.toggle(BTN_STATE_ENUM.START);
    timerControlBtn.classList.toggle(BTN_STATE_ENUM.PAUSE);
}

function startTimer() {
    if (timerId !== null || remaining === 0) return;
    endTime = performance.now() + remaining;
    timerId = setInterval(updateTimer, 1000)
    toggleClasses();
    timerControlBtn.textContent = "PAUSE";
}

function pauseTimer() {
    resetTimer("SOFT");
    remaining = Math.max(0, endTime - performance.now());
    toggleClasses();
    timerControlBtn.textContent = "RESUME";
}

function controlTimer() {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
}

function resetStart() {
    timerControlBtn.classList.add(BTN_STATE_ENUM.START);
    timerControlBtn.classList.remove(BTN_STATE_ENUM.PAUSE);
    timerControlBtn.textContent = "START";
}

function reset() {
    resetTimer("HARD");
    resetScore();
    resetLeader();
    resetStart();
}
