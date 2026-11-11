
// 1. Forms aur Buttons ko unki ID se pakdo
const loginform = document.getElementById("loginForm");
const registerform = document.getElementById("registerForm");

// target button 
const loginbtn = document.getElementById("showLoginBtn");
const registerbtn = document.getElementById("showRegisterBtn");

// 2. Register Button dabane par kya hoga
registerbtn.addEventListener('click' , () => {
    loginform.style.display = 'none';
    registerform.style.display = 'block';
});

// 3. Log In Button dabane par kya hoga
fetch('https://handoveriq-2xn4.onrender.com/api/handoveriq/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})
.then(async response => {
    const text = await response.text();
    console.log("register response:", response.status, text);

    if (!response.ok) {
        alert("Registration failed (" + response.status + ")");
        return;                       // error ko ID mat banne do
    }

    // "User registered successfully: <id>" se sirf ID nikalo
    const userId = text.split(": ").pop().replace(/["{}]/g, "").trim();
    localStorage.setItem("userId", userId);
    alert("Account registered successfully!");
    registerForm.reset();
    window.location.href = 'dashboard.html';
})
.catch(error => console.error('Register Error:', error));


// ==================== 2. LOGIN LOGIC ====================
fetch('https://handoveriq-2xn4.onrender.com/api/handoveriq/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
})
.then(async response => {
    const text = await response.text();
    console.log("login response:", response.status, text);

    if (!response.ok) {
        alert("Login failed (" + response.status + ")");
        return;                       // error ko ID mat banne do
    }

    const userId = text.replace(/["{}]/g, "").trim();
    if (!userId) {
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem("userId", userId);
    alert("Login successful! Welcome back.");
    loginForm.reset();
    window.location.href = 'dashboard.html';
})
.catch(error => console.error('Login Error:', error));