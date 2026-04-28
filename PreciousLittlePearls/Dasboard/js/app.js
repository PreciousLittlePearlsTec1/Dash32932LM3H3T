// ========== ELEMENTEN ==========
const loader = document.getElementById("loader");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

// ========== CLOCK ==========
function updateClock(){
    const now = new Date();

    const time = now.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    timeEl.textContent = time;
    dateEl.textContent = date;
}

setInterval(updateClock, 1000);
updateClock();

// ========== LOADER ==========
function showLoader(){
    loader.style.display = "flex";
}

// ========== SEARCH ==========
function isURL(text){
    return text.includes(".") && !text.includes(" ");
}

function goSearch(){
    let query = input.value.trim();
    if(query === "") return;

    showLoader();

    setTimeout(()=>{
        if(isURL(query)){
            if(!query.startsWith("http")){
                query = "https://" + query;
            }
            window.location.href = query;
        }else{
            window.location.href =
                "https://www.google.com/search?q=" + encodeURIComponent(query);
        }
    },1200);
}

// events
btn.addEventListener("click", goSearch);
input.addEventListener("keypress", e=>{
    if(e.key === "Enter") goSearch();
});
