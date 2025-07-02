const url = "http://127.0.0.1:5000";
let currentId = null;

// REGISTER
const registerUser = async (e) => {
  e.preventDefault();
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);
  const responseDiv = document.getElementById("response");

  const res = await fetch(`${url}/api/register`, {
    method: "POST",
    body: formData,
    // DO NOT set Content-Type header manually, browser will handle it
  });

  const data = await res.json();
  responseDiv.textContent = data.message || data.error;

  if (res.ok) {
    localStorage.setItem("jwt", data.token); // Save the token
    window.location.href = "login.html";
  }
};

// LOGIN
const loginUser = async () => {
  const username_or_email = document.getElementById("username_or_email").value;
  const password = document.getElementById("password").value;
  const resMsg = document.getElementById("response");

  const res = await fetch(`${url}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username_or_email, password }),
  });

  const data = await res.json();
  resMsg.textContent = data.message || data.error;

  if (res.ok) {
    localStorage.setItem("jwt", data.token); // Store token for auth
    window.location.href = "index.html";
  }
};
  
