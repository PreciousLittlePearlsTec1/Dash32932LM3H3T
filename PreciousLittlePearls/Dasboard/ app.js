const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loadingScreen");

const popup = document.getElementById("confirmPopup");
const popupText = document.getElementById("popupText");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let pendingURL = null;

/* CLOCK */
function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    document.getElementById("clock").textContent = time;
}
setInterval(updateClock,1000);
updateClock();

/* ENTER = SEARCH */
input.addEventListener("keydown", e=>{
    if(e.key === "Enter") startSearch();
});
searchBtn.addEventListener("click", startSearch);

/* Detect URL */
function isURL(text){
    return text.includes(".") && !text.includes(" ");
}

/* Loading screen */
function showLoading(callback){
    loading.classList.add("show");
    setTimeout(callback,2000);
}

/* SEARCH FUNCTION */
function startSearch(){
    const text = input.value.trim();
    if(!text) return;

    if(isURL(text)){
        pendingURL = text.startsWith("http") ? text : "https://" + text;

        popupText.textContent =
        `You typed: "${text}"\nDo you really want to visit this site?`;

        popup.classList.remove("hidden");
    }
    else{
        const google = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
        showLoading(()=> window.location.href = google);
    }
}

/* Popup buttons */
confirmBtn.onclick = ()=>{
    popup.classList.add("hidden");
    showLoading(()=> window.location.href = pendingURL);
};

cancelBtn.onclick = ()=>{
    popup.classList.add("hidden");
};
