
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    
    const users = [
      { email: "student@eduplus.com", password: "12345" },
      { email: "profesor@eduplus.com", password: "98765" },
      { email: "admin@eduplus.com", password: "admin123" },
    ];

   
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      message.textContent = "✅ Uspešno ste se prijavili, dobrodošli!";
      message.className = "message success";

    
      localStorage.setItem("loggedUser", email);

      
      setTimeout(() => {
        window.location.href = "kursevi2.html";
      }, 1500);
    } else {
      message.textContent = "❌ Pogrešan email ili lozinka!";
      message.className = "message error";
    }
  });
}


if (window.location.pathname.includes("kursevi2.html")) {
  const loggedUser = localStorage.getItem("loggedUser");
  if (!loggedUser) {
    alert("Morate biti ulogovani da biste pristupili ovoj stranici!");
    window.location.href = "login.html";
  }
}
