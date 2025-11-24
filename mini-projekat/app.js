
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}


const defaultUsers = [
  { email: "student@eduplus.com",  password: "12345" },
  { email: "profesor@eduplus.com", password: "98765" },
  { email: "admin@eduplus.com",    password: "admin123" }
];

let users = [];

try {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  } else {
    users = defaultUsers;
    localStorage.setItem("users", JSON.stringify(users));
  }
} catch (err) {
  console.error("Greška pri čitanju korisnika iz localStorage:", err);
  users = defaultUsers;
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const message = document.getElementById("loginMessage");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passInput ? passInput.value.trim() : "";

    if (!email || !password) {
      if (message) {
        message.textContent = "❌ Unesite email i lozinku.";
        message.className = "message error";
      }
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      if (message) {
        message.textContent = "✅ Uspešno ste se prijavili, dobrodošli!";
        message.className = "message success";
      }

      
      localStorage.setItem("loggedUser", email);

      setTimeout(() => {
        window.location.href = "kursevi2.html";
      }, 1200);
    } else {
      if (message) {
        message.textContent = "❌ Pogrešan email ili lozinka!";
        message.className = "message error";
      }
    }
  });
}


const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPassword");
    const message = document.getElementById("registerMessage");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passInput ? passInput.value.trim() : "";

    if (!email || !password) {
      if (message) {
        message.textContent = "❌ Unesite email i lozinku.";
        message.className = "message error";
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (message) {
        message.textContent = "❌ Neispravan format email adrese.";
        message.className = "message error";
      }
      return;
    }

    
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      existingUser.password = password;
    } else {
      users.push({ email, password });
    }

    saveUsers();

    if (message) {
      message.textContent = "✅ Registracija uspešna! Možete da se ulogujete.";
      message.className = "message success";
    }

    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}


if (window.location.pathname.endsWith("kursevi2.html")) {
  const loggedUser = localStorage.getItem("loggedUser");
  if (!loggedUser) {
    alert("Morate biti ulogovani da biste pristupili ovoj stranici!");
    window.location.href = "login.html";
  }
}
