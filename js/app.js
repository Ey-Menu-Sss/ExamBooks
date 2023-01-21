let localS = localStorage.getItem("TrueLogin")
if(!localS){
    window.location.replace("../pages/login.html")
}else{
    window.location.replace("../pages/home.html")
}