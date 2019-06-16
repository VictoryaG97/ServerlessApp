function register() {
    clearErrors();
    const email = document.forms['registration-form']['email'].value;
    const password = document.forms['registration-form']['password'].value;
    const repeatedPassword = document.forms['registration-form']['repeated-password'].value;
    const fname = document.forms['registration-form']['fname'].value;
    const lname = document.forms['registration-form']['lname'].value;
    const fn = document.forms['registration-form']['fn'].value;
    data = {
        'email': email,
        'password': password,
        'repeatedPassword': repeatedPassword,
        'first_name': fname,
        'last_name': lname,
        'fn': fn
    };
    if (!validate(data)) {
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            sessionStorage.setItem('loginScreenSuccessMessage', 'Успешна регистрация! Вече можете да влезете в системата!');
            backToLogin();
        } else {
            displayUnsuccessfulRegistration();
        }
    };
    xhr.open('POST', 'https://9hw3b3y4i2.execute-api.us-east-1.amazonaws.com/dev/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function validate(form) {
    let result = true;
    if (!validateLength(form.email, 1, 64)) {
        result = false;
        document.getElementById('email-error').style.display = 'block';
    }
    if (!validateLength(form.password, 6, 64)) {
        result = false;
        document.getElementById('password-error').style.display = 'block';
    }
    if (form.password !== form.repeatedPassword) {
        result = false;
        document.getElementById('repeat-password-error').style.display = 'block';
    }
    if (!validateLength(form.first_name, 1, 255) || !validateIsWord(form.first_name)) {
        result = false;
        document.getElementById('fname-error').style.display = 'block';
    }
    if (!validateLength(form.last_name, 1, 255) || !validateIsWord(form.last_name)) {
        result = false;
        document.getElementById('lname-error').style.display = 'block';
    }
    if (!validateLength(form.fn, 5, 5) || !validateIsNumber(form.fn)) {
        result = false;
        document.getElementById('fn-error').style.display = 'block';
    }
    return result;
}

function displayUnsuccessfulRegistration() {
    const unsuccessfulRegistrationElem = document.getElementById('unsuccessful-registration');
    unsuccessfulRegistrationElem.style.display = 'block';
}

function clearErrors() {
    const errors = document.getElementsByClassName('form__item--invalid');
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        error.style.display = 'none';
    }
}

function handleEnter(e){
    const keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        register();
    }
}

function backToLogin() {
    window.location.href = '../index.html';
}
