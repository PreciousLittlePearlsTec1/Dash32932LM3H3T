const $ = (id)=>document.getElementById(id);

// ===== ELEMENTS =====
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

// ===== SETTINGS =====
settingsBtn.onclick=()=>panel.classList.toggle("open");

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

// analog
function updateAnalog(){
  const s=document.querySelector(".second");
  const m=document.querySelector(".minute");
  const h=document.querySelector(".hour");

  if(!s||!m||!h) return;

  const now=new Date();

  s.style.transform=`translateX(-50%) rotate(${now.getSeconds()*6}deg)`;
  m.style.transform=`translateX(-50%) rotate(${now.getMinutes()*6}deg)`;
  h.style.transform=`translateX(-50%) rotate(${now.getHours()*30}deg)`;
}

// ===== CLOCK MODE =====
function applyClock(){
  $("digitalClock").style.display = state.clock==="digital"?"block":"none";
  $("analogClock").style.display = state.clock==="analog"?"block":"none";
}

// ===== SEARCH =====
function isURL(t){
  return t.includes(".") && !t.includes(" ");
}

function search(){
  const q=input.value.trim();
  if(!q) return;

  loader.style.display="flex";

  setTimeout(()=>{
    if(isURL(q)){
      location.href = q.startsWith("http")?q:"https://"+q;
    }else{
      location.href="https://google.com/search?q="+encodeURIComponent(q);
    }
  },900);
}

// ===== EVENTS =====
btn.onclick=search;
input.onkeydown=(e)=>e.key==="Enter"&&search();

// settings controls
themeSelect.onchange=e=>{state.theme=e.target.value;save();applyTheme();};
accentPicker.oninput=e=>{state.accent=e.target.value;save();applyTheme();};
clockSelect.onchange=e=>{state.clock=e.target.value;save();applyClock();};

// ===== INIT =====
function init(){
  themeSelect.value=state.theme;
  accentPicker.value=state.accent;
  clockSelect.value=state.clock;

  applyTheme();
  applyClock();

  updateClock();
  updateAnalog();

  setInterval(()=>{
    updateClock();
    updateAnalog();
  },1000);
}

init();
