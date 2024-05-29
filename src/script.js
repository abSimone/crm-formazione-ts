const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let isValid = true;

    if (emailValue === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else {
        showSuccess(email);
    }

    if (passwordValue === '') {
        showError(password, 'Password is required');
        isValid = false;
    } else {
        showSuccess(password);
    }

    if (isValid) {
        alert('Logged in successfully!');
        form.reset();
    }
});

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    let errorText = formControl.querySelector('.error-text');
    if (!errorText) {
        errorText = document.createElement('small');
        errorText.className = 'error-text';
        formControl.appendChild(errorText);
    }
    errorText.textContent = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const errorText = formControl.querySelector('.error-text');
    if (errorText) {
        errorText.textContent = '';
    }
}

email.addEventListener('focus', () => {
    const formControl = email.parentElement;
    formControl.classList.remove('error');
});

password.addEventListener('focus', () => {
    const formControl = password.parentElement;
    formControl.classList.remove('error');
});



