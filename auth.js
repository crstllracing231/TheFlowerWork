document.addEventListener('DOMContentLoaded', () => {
    //SIGN UP
   const signUpForm = document.getElementById('signup-form');
   if (signUpForm) {
       signUpForm.addEventListener('submit', (e) => {
           e.preventDefault();

           const emailInput = document.getElementById('email');
           const passwordInput = document.getElementById('password');
           const emailValue = emailInput.value.trim();
           const passwordValue = passwordInput.value.trim();

           clearErrors();

           let isValid = true;
           if (!isValidEmail(emailValue)) {
               showError(emailInput, 'email-error', 'Please enter a valid email address.');
               isValid = false;
           }

           if (passwordValue.length < 8) {
               showError(passwordInput, 'pw-error', 'Password must be at least 8 characters.');
               isValid = false;
           }

           if (!isValid) {
               return;
           }

           const user = {email: emailValue, password: passwordValue};
           localStorage.setItem('customer', JSON.stringify(user));
           localStorage.setItem('isLoggedIn', 'true');
           alert('Account created successfully!');
           window.location.href = 'index.html';
       })
   }

   //LOGIN
    const loginForm = document.getElementById('login-form');
   if (loginForm) {
       loginForm.addEventListener('submit', (e) => {
           e.preventDefault();

           const emailInput = document.getElementById('email');
           const passwordInput = document.getElementById('password');
           const emailValue = emailInput.value.trim();
           const passwordValue = passwordInput.value.trim();

           clearErrors();

           const accDetailsJSON = localStorage.getItem('customer');

           if (!accDetailsJSON) {
               showError(emailInput, 'email-error', 'No account found with this email. Please sign up.')
               return;
           }

           const accDetails = JSON.parse(accDetailsJSON);

           if (emailValue === accDetails.email && passwordValue === accDetails.password) {
               localStorage.setItem('isLoggedIn', 'true');
               alert("Welcome to The Flower Work!");
               window.location.href = 'index.html';
           } else {
               showError(passwordInput, 'pw-error', 'Invalid email or password.');
           }
       })
   }
});

function showError(inputElement, errorId, message) {
    const errorElement = document.getElementById(errorId);
    inputElement.classList.add('input-error');
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-msg');
    const inputs = document.querySelectorAll('input');

    errors.forEach(error => error.style.display = 'none');
    inputs.forEach(input => input.classList.remove('input-error'));
}

function isValidEmail(email) {
    const rx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rx.test(String(email).toLowerCase());
}