window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

function checkLoginStatus() {
    const isLoggedIn = false;
    return isLoggedIn;
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

document.addEventListener('DOMContentLoaded', updateHeader);