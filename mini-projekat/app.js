
document.getElementById("year").textContent = new Date().getFullYear();


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

  
    const validEmail = "student@eduplus.com";
    const validPassword = "12345";

    if (email === validEmail && password === validPassword) {
      message.textContent = "Uspešno ste se prijavili! Dobrodošli u EduPlus.";
      message.className = "message success";
      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 1500);
    } else {
      message.textContent = "Pogrešan email ili lozinka!";
      message.className = "message error";
    }
  });
}
