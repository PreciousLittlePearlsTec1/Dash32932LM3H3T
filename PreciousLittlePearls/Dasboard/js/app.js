const $ = (id)=>document.getElementById(id);

// ===== UI =====
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

// ===== STATE =====
let state = JSON.parse(localStorage.getItem("dash_state")) || {
  theme:"auto",
  accent:"#6366f1",
  clock:"digital"
};

// ===== SAVE =====
function save(){
  localStorage.setItem("dash_state",JSON.stringify(state));
}

// ===== THEME =====
function applyTheme(){
  document.documentElement.style.setProperty("--accent",state.accent);

  let dark =
    state.theme==="dark" ||
    (state.theme==="auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.body.classList.toggle("dark",dark);
}

// ===== CLOCK =====
function updateClock(){
  const now = new Date();

  timeEl.textContent = now.toLocaleTimeString("nl-NL");
  dateEl.textContent = now.toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"});
}

// analog clock
function updateAnalog(){
  const now = new Date();
  const s = now.getSeconds()*6;
  const m = now.getMinutes()*6;
  const h = now.getHours()*30;

  document.querySelector(".second")?.style.setProperty("transform",`translateX(-50%) rotate(${s}deg)`);
  document.querySelector(".minute")?.style.setProperty("transform",`translateX(-50%) rotate(${m}deg)`);
  document.querySelector(".hour")?.style.setProperty("transform",`translateX(-50%) rotate(${h}deg)`);
}

// ===== CLOCK MODE =====
function applyClock(){
  if(state.clock==="digital"){
    $("digitalClock").style.display="block";
    $("analogClock").style.display="none";
  }else{
    $("digitalClock").style.display="none";
    $("analogClock").style.display="block";
  }
}

// ===== SEARCH =====
function isURL(t){
  return t.includes(".") && !t.includes(" ");
}

function search(){
  let q = input.value.trim();
  if(!q) return;

  loader.style.display="flex";

  setTimeout(()=>{
    if(isURL(q)){
      if(!q.startsWith("http")) q="https://"+q;
      location.href=q;
    }else{
      location.href="https://google.com/search?q="+encodeURIComponent(q);
    }
  },900);
}

// ===== SETTINGS =====
settingsBtn.onclick=()=>panel.classList.toggle("open");

themeSelect.onchange=e=>{
  state.theme=e.target.value;
  save(); applyTheme();
};

accentPicker.oninput=e=>{
  state.accent=e.target.value;
  save(); applyTheme();
};

clockSelect.onchange=e=>{
  state.clock=e.target.value;
  save(); applyClock();
};

// ===== EVENTS =====
btn.onclick=search;
input.addEventListener("keydown",e=>e.key==="Enter"&&search());

// ===== INIT =====
themeSelect.value=state.theme;
accentPicker.value=state.accent;
clockSelect.value=state.clock;

applyTheme();
applyClock();

setInterval(()=>{
  updateClock();
  updateAnalog();
},1000);

updateClock();
updateAnalog();
