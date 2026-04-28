document.addEventListener("DOMContentLoaded", () => {

  // ========= ELEMENTS =========
  const loader = document.getElementById("loader");
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  // ========= CLOCK =========
  function updateClock(){
    const now = new Date();

    timeEl.textContent = now.toLocaleTimeString("nl-NL", {
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit"
    });

    dateEl.textContent = now.toLocaleDateString("nl-NL", {
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ========= SEARCH =========
  function isURL(text){
    return text.includes(".") && !text.includes(" ");
  }

  function search(){
    const q = input.value.trim();
    if(!q) return;

    loader.style.display = "flex";

    setTimeout(() => {
      if(isURL(q)){
        window.location.href = q.startsWith("http") ? q : "https://" + q;
      } else {
        window.location.href =
          "https://www.google.com/search?q=" + encodeURIComponent(q);
      }
    }, 800);
  }

  btn.addEventListener("click", search);

  input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") search();
  });

});
