const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let pendingURL = "";

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

/* SEARCH */
function isURL(text){
    return text.includes(".") && !text.includes(" ");
}

function showLoader(callback){
    loader.classList.remove("hidden");
    setTimeout(callback,2000);
}

function doSearch(){
    let text = input.value.trim();
    if(!text) return;

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

/* POPUP */
yesBtn.onclick = ()=>{
    popup.classList.add("hidden");
    showLoader(()=> window.location.href = pendingURL);
};

noBtn.onclick = ()=>{
    popup.classList.add("hidden");
};

btn.onclick = doSearch;
input.addEventListener("keypress", e=>{
    if(e.key==="Enter") doSearch();
});
