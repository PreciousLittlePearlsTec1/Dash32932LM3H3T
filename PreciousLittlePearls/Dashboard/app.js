console.log("APP STARTED");

/* ELEMENTEN */
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

console.log("Elements found:", {
    input, btn, loader, popup, popupText, yesBtn, noBtn
});

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

/* HELPERS */
function isURL(text){
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}/i;
    const result = urlPattern.test(text);
    console.log("isURL check:", text, "=>", result);
    return result;
}

function showLoader(callback){
    console.log("SHOW LOADER");
    loader.classList.remove("hidden");
    setTimeout(()=>{
        console.log("LOADER FINISHED");
        callback();
    },1500);
}

/* SEARCH FUNCTION */
function startSearch(){
    const text = input.value.trim();
    console.log("SEARCH TRIGGERED:", text);

    if(text === ""){
        console.log("Nothing typed → abort");
        return;
    }

    if(isURL(text)){
        console.log("URL DETECTED");
        pendingURL = text.startsWith("http") ? text : "https://" + text;

        popupText.innerText =
            "Do you really want to go to:\n" + text + " ?";
        popup.classList.remove("hidden");
        return;
    }

    console.log("GOOGLE SEARCH");
    showLoader(()=>{
        window.location.href =
        "https://www.google.com/search?q=" + encodeURIComponent(text);
    });
}

/* POPUP BUTTONS */
yesBtn.addEventListener("click", ()=>{
    console.log("YES CLICKED", pendingURL);

    if(!pendingURL){
        console.log("No URL stored → abort");
        return;
    }

    popup.classList.add("hidden");

    showLoader(()=>{
        window.location.href = pendingURL;
    });
});

noBtn.addEventListener("click", ()=>{
    console.log("NO CLICKED");
    popup.classList.add("hidden");
    pendingURL = null;
});

/* EVENTS */
btn.addEventListener("click", ()=>{
    console.log("Search button clicked");
    startSearch();
});

input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        console.log("ENTER pressed");
        startSearch();
    }
});

/* EXTRA DEBUG — check of popup zichtbaar is bij start */
window.addEventListener("load", ()=>{
    console.log("WINDOW LOADED");

    const popupVisible = !popup.classList.contains("hidden");
    console.log("Popup visible at start:", popupVisible);
});
