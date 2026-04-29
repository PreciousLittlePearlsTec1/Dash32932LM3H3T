/* RESET */
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

body{
    font-family: "Segoe UI", Arial, sans-serif;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#eef2ff,#f9fbff);
}

/* ================= MAIN CARD ================= */

.card{
    width:430px;
    padding:40px;
    border-radius:22px;
    background:white;
    box-shadow:0 25px 70px rgba(0,0,0,0.12);
    text-align:center;
}

h1{
    color:#6366f1;
    margin-bottom:15px;
}

/* ================= CLOCK ================= */

.clock{
    font-size:48px;
    font-weight:600;
    margin-bottom:5px;
}

.date{
    color:#666;
    margin-bottom:25px;
}

/* ================= SEARCH ================= */

.search-box{
    display:flex;
    gap:12px;
}

.search-box input{
    flex:1;
    padding:13px 14px;
    border-radius:12px;
    border:1px solid #ddd;
    font-size:16px;
    transition:0.2s;
}

.search-box input:focus{
    outline:none;
    border-color:#6366f1;
    box-shadow:0 0 0 3px rgba(99,102,241,0.15);
}

.search-box button{
    background:#6366f1;
    color:white;
    border:none;
    padding:13px 18px;
    border-radius:12px;
    font-size:16px;
    cursor:pointer;
    transition:0.2s;
}

.search-box button:hover{
    transform:translateY(-1px);
    box-shadow:0 8px 20px rgba(99,102,241,0.3);
}

/* ================= LOADING SCREEN ================= */

.loader{
    position:fixed;
    inset:0;
    background:white;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    z-index:999;
}

.spinner{
    width:55px;
    height:55px;
    border-radius:50%;
    border:6px solid #eee;
    border-top:6px solid #6366f1;
    animation:spin 1s linear infinite;
    margin-bottom:15px;
}

@keyframes spin{
    to{ transform:rotate(360deg); }
}

/* ================= POPUP ================= */

.popup{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.35);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:998;
}

.popup-box{
    width:360px;
    background:white;
    padding:30px;
    border-radius:18px;
    text-align:center;
    box-shadow:0 20px 60px rgba(0,0,0,0.2);
}

.popup-box h2{
    margin-bottom:10px;
}

.popup-box p{
    color:#555;
    white-space:pre-line;
}

.popup-buttons{
    display:flex;
    justify-content:center;
    gap:15px;
    margin-top:22px;
}

.popup-buttons button{
    padding:11px 18px;
    border:none;
    border-radius:10px;
    font-size:15px;
    cursor:pointer;
}

#yesBtn{
    background:#6366f1;
    color:white;
}

#noBtn{
    background:#e5e7eb;
}

/* ⚠️ SUPER BELANGRIJK FIX */
.hidden{
    display:none !important;
}
