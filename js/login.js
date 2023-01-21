let error = document.querySelector(".error");
let form = document.querySelector(".form");
// check localStorage
if(localStorage.getItem("TrueLogin")){
  window.location.replace("../pages/home.html")
}
async function Login() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  console.log(username, password);
  let res = await fetch("https://reqres.in/api/login", {
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json()
  console.log(data);
  if(data.token){
    localStorage.setItem("TrueLogin", data.token)
    error.style.display = "none"
    window.location.replace('../pages/home.html')
  }else{
    error.style.display = "block"
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  Login()
})