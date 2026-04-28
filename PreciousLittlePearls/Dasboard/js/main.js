const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");

function isURL(text){
    return text.includes(".") && !text.includes(" ");
}

function goSearch(){
    let query = input.value.trim();
    if(query === "") return;

    showLoader();

    setTimeout(()=>{
        if(isURL(query)){
            // URL openen
            if(!query.startsWith("http")){
                query = "https://" + query;
            }
            window.location.href = query;
        }else{
            // Google search
            window.location.href =
                "https://www.google.com/search?q=" + encodeURIComponent(query);
        }
    },1500); // loading animatie tijd
}

btn.addEventListener("click", goSearch);
input.addEventListener("keypress", e=>{
    if(e.key === "Enter") goSearch();
});
