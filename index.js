window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function updateHeader() {
    const loggedOut = document.getElementById('logged-out');
    const loggedIn = document.getElementById('logged-in');

    if (checkLoginStatus()) {
        if (loggedOut) {loggedOut.style.display = 'none';}
        if (loggedIn) {loggedIn.style.display = 'flex';}
    }
    else {
        if (loggedIn) {loggedIn.style.display = 'none';}
        if (loggedOut) {loggedOut.style.display = 'flex';}
    }
}

function toSignUp() {
    window.location.href = 'signup.html';
}

function toMenu() {
    window.location.href = 'bouquets.html';
}


document.addEventListener('DOMContentLoaded', () => {
    updateHeader();

    const getStartedBtns = document.querySelectorAll('.get-started-btn');
    if (getStartedBtns.length > 0) {
        getStartedBtns.forEach(btn => btn.addEventListener('click', toSignUp));
    }

    const browseBtn = document.querySelector('.browse-btn');
    if (browseBtn) browseBtn.addEventListener('click', toMenu);

    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const confirmLogout = confirm('Are you sure you want to log out?');

            if (confirmLogout) {
                localStorage.setItem('isLoggedIn', 'false');
                alert('You have been logged out successfully.');
                window.location.reload();
            }
        });
    }
})