
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


let users = JSON.parse(localStorage.getItem("users")) || [
  { email: "student@eduplus.com", password: "12345" },
  { email: "profesor@eduplus.com", password: "98765" },
  { email: "admin@eduplus.com", password: "admin123" }
];



const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("loginMessage");

    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
      msg.textContent = "✅ Uspešno ste se prijavili!";
      msg.className = "message success";

      localStorage.setItem("loggedUser", email);

      setTimeout(() => (window.location = "kursevi2.html"), 1200);
    } else {
      msg.textContent = "❌ Pogrešan email ili lozinka!";
      msg.className = "message error";
    }
  });
}



const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPassword").value.trim();
    const msg = document.getElementById("registerMessage");

    const exists = users.find(u => u.email === email);

    if (exists) {
      msg.textContent = "⚠️ Ovaj email već postoji!";
      msg.className = "message error";
      return;
    }

    users.push({ email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    msg.textContent = "✅ Registracija uspešna!";
    msg.className = "message success";

    setTimeout(() => (window.location = "login.html"), 1500);
  });
}



if (window.location.pathname.includes("kursevi2.html")) {
  const logged = localStorage.getItem("loggedUser");
  if (!logged) {
    alert("Morate biti ulogovani!");
    window.location = "login.html";
  }
}
