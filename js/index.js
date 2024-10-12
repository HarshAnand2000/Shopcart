const username = document.querySelector("#username");
const password = document.querySelector("#password");

const login = document.querySelector("#login");

login.addEventListener("click", () => {
  if (username.value == "Harsh" && password.value == "Anand") {
    login.href = `home.html?username=${username.value}`;
  }
});
