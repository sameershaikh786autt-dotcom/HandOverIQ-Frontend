
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



// Base Backend URL (space-free)
const API_BASE_URL = 'https://handoveriq-2xn4.onrender.com/api/handoveriq';

// ==================== 1. REGISTER LOGIC ====================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Registration failed');
            }

            const userId = await response.text();
            if (userId && userId.trim().length > 0) {
                localStorage.setItem("userId", userId.trim());
                alert("Account registered successfully!");
                registerForm.reset();
                window.location.href = 'dashboard.html';
            } else {
                alert("Registration failed: Empty response from server.");
            }
        } catch (error) {
            console.error('Register Error:', error);
            alert("Registration failed: " + error.message);
        }
    });
}

// ==================== 2. LOGIN LOGIC ====================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const loginData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/login`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('Invalid email or password.');
            }

            const userId = await response.text();
            if (userId && userId.trim().length > 0) {
                localStorage.setItem("userId", userId.trim());
                alert("Login successful! Welcome back.");
                loginForm.reset();
                window.location.href = 'dashboard.html';
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(error.message);
        }
    });
}