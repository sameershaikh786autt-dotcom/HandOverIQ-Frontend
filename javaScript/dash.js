 const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => {
            // Wapas login page par bhejne ke liye
            localStorage.removeItem('userId');
            window.location.href = 'index.html';
});