console.log("Clean app.js loaded");

/* ELEMENTEN */
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let pendingURL = null;

/* CLOCK */
function updateClock(){
    const now = new Date();
    document.getElementById("clock").innerText =
        now.toLocaleTimeString("nl-NL");

    document.getElementById("date").innerText =
        now.toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
}
setInterval(updateClock,1000);
updateClock();

/* URL CHECK */
function isURL(text){
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}/i;
    return urlPattern.test(text);
}

/* LOADER */
function showLoader(callback){
    loader.classList.remove("hidden");
    setTimeout(callback,1500);
}

/* SEARCH */
function startSearch(){
    const text = input.value.trim();
    if(text === "") return;

    if(isURL(text)){
        pendingURL = text.startsWith("http") ? text : "https://" + text;
        popupText.innerText = "Do you really want to go to:\n" + text + " ?";
        popup.classList.remove("hidden");
        return;
    }

    showLoader(()=>{
        window.location.href =
        "https://www.google.com/search?q=" + encodeURIComponent(text);
    });
}

/* POPUP BUTTONS */
yesBtn.onclick = ()=>{
    if(!pendingURL) return;
    popup.classList.add("hidden");
    showLoader(()=> window.location.href = pendingURL);
};

noBtn.onclick = ()=>{
    popup.classList.add("hidden");
    pendingURL = null;
};

/* EVENTS */
btn.onclick = startSearch;
input.addEventListener("keydown", e=>{
    if(e.key==="Enter") startSearch();
});
