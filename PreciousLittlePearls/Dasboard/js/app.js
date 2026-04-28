const $ = (id)=>document.getElementById(id);

// elements
const loader = $("loader");
const input = $("searchInput");
const btn = $("searchBtn");
const timeEl = $("time");
const dateEl = $("date");

// clock
function updateClock(){
  const now = new Date();

  timeEl.textContent = now.toLocaleTimeString("nl-NL",{
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
  });

  dateEl.textContent = now.toLocaleDateString("nl-NL",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
  });
}

// search
function isURL(text){
  return text.includes(".") && !text.includes(" ");
}

function search(){
  const q = input.value.trim();
  if(!q) return;

  loader.style.display="flex";

  setTimeout(()=>{
    if(isURL(q)){
      location.href = q.startsWith("http") ? q : "https://"+q;
    }else{
      location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
    }
  },900);
}

// events
btn.onclick = search;
input.addEventListener("keydown",(e)=>{
  if(e.key==="Enter") search();
});

// init
setInterval(updateClock,1000);
updateClock();
