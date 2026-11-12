
// 1. Forms aur Buttons ko unki ID se pakdo
const loginform = document.getElementById("loginForm");
const registerform = document.getElementById("registerForm");

// toggleBtn
const toggleBtn = document.getElementById("toggleBtn")


// 2. Register And Log-In
let isLogin = true;

toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin; // har click par ulta

    if (isLogin) {
        loginform.style.display = 'block';
        registerform.style.display = 'none';
        toggleBtn.textContent = 'Create User';
    } else {
        registerform.style.display = 'block';
        loginform.style.display = 'none';
        toggleBtn.textContent = 'Log In';
    }
});


// LOGIN AND REGISTER FORM LINK WITH BACKEND 
const BASE_URL = "https://handoveriq-2xn4.onrender.com";
const BASE_URL_BACK = `${BASE_URL}/api/handoveriq`;


// REGISTER
registerform.addEventListener('submit',  async (e) => {
    e.preventDefault();

    // Object m krne k liye
    // const formData = new FormData(form);
    // const data = Object.fromEntries(formData);

    const data = Object.fromEntries(new FormData(registerform));
    

    // yha s ab fetch krne k km hotaa h hai
    try{
        const  response = await fetch(`${BASE_URL_BACK}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }); 

        // alert("Data :-> " + data);
        if(response.ok) {

            const text = await response.text();
            // text = "User registered successfully: 12345"

            const userId = text.substring(text.indexOf(':') + 1).trim();

            localStorage.setItem("userId", userId);

            alert("registeration successfully completed!")
            registerform.reset();
        }else {
            alert("registeration failed!")
        }
        

    } catch(error) {
        alert("Register not complete!")
        console.error(error);
    }
});



// LOGIN
loginform.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(loginform));

    try {

        const response = await fetch(`${BASE_URL_BACK}/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        });

        if(response.ok){
              const userId = (await response.text()).trim();
              localStorage.setItem("userId", userId);

              // yh login k baad k page hoga
              window.location.href = "dashboard.html";

              alert("login successfully complete")
              loginform.reset();
        }else {
            alert("login failed");
        }
        
    } catch (error) {
        alert("Login failed!")
        console.error(error);
    }

})
