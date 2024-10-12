const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const strengthText = document.getElementById('strength-text');
const strengthBar = document.getElementById('strength-bar');
const togglePassword = document.getElementById('toggle-password');

const lengthRequirement = document.getElementById('length');
const uppercaseRequirement = document.getElementById('uppercase');
const numberRequirement = document.getElementById('number');
const specialRequirement = document.getElementById('special');

username.addEventListener('input', function() {
    const usernameValue = username.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (/\s/.test(usernameValue)) {
        showError(username, 'Username cannot contain spaces.');
    } else if (!usernameRegex.test(usernameValue)) {
        showError(username, 'Username must only contain English letters and numbers.');
    } else {
        clearError(username);
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');

    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.visibility = 'visible';
    }
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');

    if (errorMessage) { 
        errorMessage.style.visibility = 'hidden';
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function checkPasswordStrength(passwordValue) {
    let strength = 0;

    if (passwordValue.length >= 8) {
        strength += 1;
        lengthRequirement.classList.add('valid');
        lengthRequirement.classList.remove('invalid');
    } else {
        lengthRequirement.classList.add('invalid');
        lengthRequirement.classList.remove('valid');
    }

    if (/[A-Z]/.test(passwordValue)) {
        strength += 1;
        uppercaseRequirement.classList.add('valid');
        uppercaseRequirement.classList.remove('invalid');
    } else {
        uppercaseRequirement.classList.add('invalid');
        uppercaseRequirement.classList.remove('valid');
    }

    if (/[0-9]/.test(passwordValue)) {
        strength += 1;
        numberRequirement.classList.add('valid');
        numberRequirement.classList.remove('invalid');
    } else {
        numberRequirement.classList.add('invalid');
        numberRequirement.classList.remove('valid');
    }

    if (/[!@#$%^&*]/.test(passwordValue)) {
        strength += 1;
        specialRequirement.classList.add('valid');
        specialRequirement.classList.remove('invalid');
    } else {
        specialRequirement.classList.add('invalid');
        specialRequirement.classList.remove('valid');
    }

    return strength;
}

password.addEventListener('input', function() {
    const passwordValue = password.value.trim();
    const strength = checkPasswordStrength(passwordValue);

    if (strength === 1) {
        strengthText.textContent = 'Password strength: Weak';
        strengthBar.style.backgroundColor = 'red'; 
    } else if (strength === 2) {
        strengthText.textContent = 'Password strength: Medium';
        strengthBar.style.backgroundColor = 'orange';
    } else if (strength >= 3) {
        strengthText.textContent = 'Password strength: Strong';
        strengthBar.style.backgroundColor = 'green'; 
    } else {
        strengthText.textContent = 'Password strength: ';
        strengthBar.style.backgroundColor = 'transparent';
    }
});

togglePassword.addEventListener('click', function() {
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
        togglePassword.textContent = 'Hide';
    } else {
        password.setAttribute('type', 'password');
        togglePassword.textContent = 'Show';
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    const usernameValue = username.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (usernameValue === '') {
        showError(username, 'Username is required.');
        isValid = false;
    } else if (/\s/.test(usernameValue)) {
        showError(username, 'Username cannot contain spaces.');
        isValid = false;
    } else if (!usernameRegex.test(usernameValue)) {
        showError(username, 'Username must only contain English letters and numbers.');
        isValid = false;
    } else {
        clearError(username);
    }

    const emailValue = email.value.trim();
    if (emailValue === '') {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showError(email, 'Email is not valid.');
        isValid = false;
    } else {
        clearError(email);
    }

    const passwordValue = password.value.trim();
    const strength = checkPasswordStrength(passwordValue);

    if (passwordValue === '') {
        showError(password, 'Password is required.');
        isValid = false;
    } else if (strength < 3) {
        showError(password, 'Password must meet at least 3 conditions.');
        isValid = false;
    } else {
        clearError(password);
    }

    if (isValid) {
        setTimeout(showModal, 1000);
    }
});

const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.close');

function showModal() {
    successModal.style.display = 'flex';
}

function hideModal() {
    successModal.style.display = 'none';
}

closeModalBtn.addEventListener('click', hideModal);

window.addEventListener('click', function(event) {
    if (event.target === successModal) {
        hideModal();
    }
});