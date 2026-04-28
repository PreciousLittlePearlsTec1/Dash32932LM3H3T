
// ==========================
// SAFE DOM READY WRAPPER
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // ========================
  // ELEMENTS (SAFE)
  // ========================
  const loader = document.getElementById("loader");
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  // ========================
  // GUARD (NO CRASH MODE)
  // ========================
  if (!input || !btn) {
    console.error("❌ Search elements missing in HTML");
    return;
  }

  // ========================
  // CLOCK (SAFE)
  // ========================
  function updateClock() {
    const now = new Date();

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }

    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ========================
  // LOADER
  // ========================
  function showLoader() {
    if (loader) loader.style.display = "flex";
  }

  // ========================
  // SEARCH LOGIC
  // ========================
  function isURL(text) {
    return text.includes(".") && !text.includes(" ");
  }

  function search() {
    const q = input.value.trim();
    if (!q) return;

    showLoader();

    setTimeout(() => {
      if (isURL(q)) {
        const url = q.startsWith("http") ? q : "https://" + q;
        window.location.href = url;
      } else {
        window.location.href =
          "https://www.google.com/search?q=" + encodeURIComponent(q);
      }
    }, 800);
  }

  // ========================
  // EVENTS (SAFE BINDING)
  // ========================
  btn.addEventListener("click", search);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
  });

});
