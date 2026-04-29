document.addEventListener("DOMContentLoaded", () => {

  const loader = document.getElementById("loader");
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  const confirmOverlay = document.getElementById("confirmOverlay");
  const confirmText = document.getElementById("confirmText");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  let approvedSites = JSON.parse(localStorage.getItem("approvedSites")) || [];

  function saveApproved(){
    localStorage.setItem("approvedSites", JSON.stringify(approvedSites));
  }

  function showLoader(){ loader.style.display="flex"; }
  function hideLoader(){ loader.style.display="none"; }

  // CLOCK
  function updateClock(){
    const now=new Date();
    timeEl.textContent=now.toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"});
    dateEl.textContent=now.toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"});
  }
  setInterval(updateClock,1000);
  updateClock();

  function isURL(text){
    return text.includes(".") && !text.includes(" ");
  }

  function goToURL(url){
    showLoader();
    setTimeout(()=>window.location.href=url,700);
  }

  function search(){
    const typed=input.value.trim();
    if(!typed) return;

    // GOOGLE SEARCH
    if(!isURL(typed)){
      showLoader();
      setTimeout(()=>{
        window.location.href="https://www.google.com/search?q="+encodeURIComponent(typed);
      },800);
      return;
    }

    const url=typed.startsWith("http")?typed:"https://"+typed;

    showLoader();

    setTimeout(()=>{

      if(approvedSites.includes(typed)){
        goToURL(url);
        return;
      }

      hideLoader();
      confirmOverlay.style.display="flex";
      confirmText.textContent=`Do you really want to go to:\n${typed}`;

      confirmYes.onclick=()=>{
        approvedSites.push(typed);
        saveApproved();
        confirmOverlay.style.display="none";
        goToURL(url);
      };

      confirmNo.onclick=()=>{
        confirmOverlay.style.display="none";
        input.value="";
      };

    },800);
  }

  btn.addEventListener("click",search);
  input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") search();
  });

});
