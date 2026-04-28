
// =======================
// SHORT SELECTOR
// =======================
const $ = (id) => document.getElementById(id);

// =======================
// ELEMENTS
// =======================
const loader = $("loader");

const input = $("searchInput");
const btn = $("searchBtn");

const settingsBtn = $("settingsBtn");
const panel = $("settingsPanel");

const themeSelect = $("themeSelect");
const accentPicker = $("accentPicker");
const clockSelect = $("clockSelect");

const timeEl = $("time");
const dateEl = $("date");

// =======================
// STATE (saved settings)
// =======================
let state = JSON.parse(localStorage.getItem("dashboard_state")) || {
  theme: "auto",
  accent: "#6366f1",
  clock: "digital"
};

// =======================
// SAVE SETTINGS
// =======================
function saveState() {
  localStorage.setItem("dashboard_state", JSON.stringify(state));
}

// =======================
// SETTINGS TOGGLE
// =======================
function toggleSettings() {
  panel.classList.toggle("open");
}

// =======================
// APPLY THEME
// =======================
function applyTheme() {
  document.documentElement.style.setProperty("--accent", state.accent);

  let isDark =
    state.theme === "dark" ||
    (state.theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.body.classList.toggle("dark", isDark);
}

// =======================
// CLOCK (DIGITAL)
// =======================
function updateDigitalClock() {
  const now = new Date();

  timeEl.textContent = now.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  dateEl.textContent = now.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// =======================
// CLOCK (ANALOG)
// =======================
function updateAnalogClock() {
  const now = new Date();

  const sec = now.getSeconds() * 6;
  const min = now.getMinutes() * 6;
  const hr = now.getHours() * 30 + min / 12;

  const secondHand = document.querySelector(".second");
  const minuteHand = document.querySelector(".minute");
  const hourHand = document.querySelector(".hour");

  if (secondHand) secondHand.style.transform = `translateX(-50%) rotate(${sec}deg)`;
  if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${min}deg)`;
  if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hr}deg)`;
}

// =======================
// APPLY CLOCK MODE
// =======================
function applyClockMode() {
  const digital = $("digitalClock");
  const analog = $("analogClock");

  if (state.clock === "digital") {
    digital.style.display = "block";
    analog.style.display = "none";
  } else {
    digital.style.display = "none";
    analog.style.display = "block";
  }
}

// =======================
// SEARCH LOGIC
// =======================
function isURL(text) {
  return text.includes(".") && !text.includes(" ");
}

function showLoader() {
  loader.style.display = "flex";
}

function search() {
  const q = input.value.trim();
  if (!q) return;

  showLoader();

  setTimeout(() => {
    if (isURL(q)) {
      const url = q.startsWith("http") ? q : "https://" + q;
      window.location.href = url;
    } else {
      window.location.href =
        "https://www.google.com/search?q=" + encodeURIComponent(q);
    }
  }, 900);
}

// =======================
// SETTINGS EVENTS
// =======================
settingsBtn.addEventListener("click", toggleSettings);

// theme
themeSelect.onchange = (e) => {
  state.theme = e.target.value;
  saveState();
  applyTheme();
};

// accent
accentPicker.oninput = (e) => {
  state.accent = e.target.value;
  saveState();
  applyTheme();
};

// clock mode
clockSelect.onchange = (e) => {
  state.clock = e.target.value;
  saveState();
  applyClockMode();
};

// =======================
// KEYBOARD SHORTCUT
// CTRL + SHIFT + V
// =======================
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "v") {
    e.preventDefault();
    toggleSettings();
  }
});

// =======================
// SEARCH EVENTS
// =======================
btn.addEventListener("click", search);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") search();
});

// =======================
// INIT
// =======================
function init() {
  // restore UI values
  themeSelect.value = state.theme;
  accentPicker.value = state.accent;
  clockSelect.value = state.clock;

  applyTheme();
  applyClockMode();
  updateDigitalClock();
  updateAnalogClock();

  setInterval(() => {
    updateDigitalClock();
    updateAnalogClock();
  }, 1000);
}

init();
