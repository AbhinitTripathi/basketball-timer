// VARIABLES & ELEMENTS
const GAME_SECONDS = 48 * 60;

const timerEl = document.getElementById("game-time");
let timerId = null;
let remaining = GAME_SECONDS;
renderTime();

const leaderEl = document.getElementById("leader");

const homeScoreEl = document.getElementById("home-score");
let homeScore = 0;
const guestScoreEl = document.getElementById("guest-score");
let guestScore = 0;

const timerControlBtn = document.getElementById("toggle-btn");

// TIMER UTILITIES
function formatTime(currTime) {
    const mm = String(Math.floor(currTime / 60)).padStart(2, '0');
    const ss = String(currTime % 60).padStart(2, '0');
    
    return `${mm}:${ss}`;
}

function renderTime() {
    timerEl.textContent = formatTime(remaining);
}

function updateTimer() {
    --remaining;
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
    
    timerId = setInterval(updateTimer, 1000)
    toggleClasses();
    timerControlBtn.textContent = "PAUSE";
}

function pauseTimer() {
    // if (remaining === 0) return;
    resetTimer("SOFT");
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
