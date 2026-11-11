
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
loginbtn.addEventListener('click', () => {
    registerform.style.display = 'none';
    loginform.style.display = 'block';
});

// ==================== 1. REGISTER LOGIC ====================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const userData = Object.fromEntries(formData.entries());

        fetch('http://localhost:8080/api/handoveriq/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => response.text()) // Backend se userId string aayegi
        .then(userId => {
            if (userId) {
                // 👉 Yahan localStorage mein userId save ho gayi!
                localStorage.setItem("userId", userId.trim());
                alert("Account registered successfully!");
                registerForm.reset();
                window.location.href = 'dashboard.html';
            } else {
                alert("Registration failed!");
            }
        })
        .catch(error => console.error('Register Error:', error));
    });
}


// ==================== 2. LOGIN LOGIC ====================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const loginData = Object.fromEntries(formData.entries());

        fetch('http://localhost:8080/api/handoveriq/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(response => response.text()) // Backend se userId string aayegi
        .then(userId => {
            if (userId && userId.length > 0) {
                // 👉 Yahan login par bhi userId localStorage mein save ho gayi!
                localStorage.setItem("userId", userId.trim());
                alert("Login successful! Welcome back.");
                loginForm.reset();
                window.location.href = 'dashboard.html';
            } else {
                alert("Invalid email or password.");
            }
        })
        .catch(error => console.error('Login Error:', error));
    });
}
