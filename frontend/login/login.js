window.onload = displayInfoMessage;

function displayInfoMessage() {
    if (!!sessionStorage.getItem('loginScreenSuccessMessage')) {
        const successMessageElement = document.getElementById('success-message');
        const successMessageTextNode = document.createTextNode(sessionStorage.getItem('loginScreenSuccessMessage'));
        successMessageElement.appendChild(successMessageTextNode);
        successMessageElement.style.display = 'block';
        sessionStorage.removeItem('loginScreenSuccessMessage');
    }
}
function login() {
    const email = document.forms['login-form']['email'].value;
    const password = document.forms['login-form']['password'].value;
    data = {'email': email, 'password': password};
    console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.href = 'dashboard/dashboard.html';
        } else {
            displayUnsuccessfulLogin();
        }
    };
  xhr.open('POST', 'https://9hw3b3y4i2.execute-api.us-east-1.amazonaws.com/dev/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

}

function displayUnsuccessfulLogin() {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.style.display = 'none';
    const errorMessageElement = document.getElementById('error-message');
    if (!!errorMessageElement) {
        errorMessageElement.style.display = 'none';
    }
    const wrongCredentialsElem = document.getElementById('wrong-credentials');
    wrongCredentialsElem.style.display = 'block';
}

function handleEnter(e){
    const keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        login();
    }
}

function register() {
    window.location.href = 'registration/register.html';
}