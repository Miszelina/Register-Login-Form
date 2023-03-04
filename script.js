const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const loginBtn = document.querySelector('.login');
const registerBtn = document.querySelector('.register');
const popup = document.querySelector('.popup');
const login = document.querySelector('.login-form');
const register = document.querySelector('.register-form');
const p = document.querySelector('.welcome-paragraph');
const welcomeRegister = document.querySelector('.welcome-register');
const welcomeLogin = document.querySelector('.welcome-Login');
const submitted = document.querySelector('.submitted');

const modeBtn = document.getElementById('mode');

modeBtn.onchange = (e) => {
	if (modeBtn.checked === true) {
	  document.documentElement.classList.remove("light")
	  document.documentElement.classList.add("dark")
	  window.localStorage.setItem('mode', 'dark');
	} else {
	  document.documentElement.classList.remove("dark")
	  document.documentElement.classList.add("light")
	  window.localStorage.setItem('mode', 'light');
	}
  }

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
			submitted.style.visibility = 'hidden';
		} else {
			clearError(el);
		}
	});
};

//argument INPUT z funkcji checkform przechowquje tablice ze zmiennymi

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.textContent} must contain at least ${min} characters`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Passwords do not match');
	}
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'Invalid e-mail format');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;
	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		submitted.style.visibility = 'visible';
	}
};

function showLogin() {
	const formBox = document.querySelectorAll('.error-text');
	console.log(formBox);
	formBox.forEach((el) => clearError(el));

	register.style.visibility = 'hidden';
	login.style.visibility = 'visible';

	welcomeRegister.style.visibility = 'hidden';
	welcomeLogin.style.visibility = 'visible';
}

function showRegister() {
	const formBox = document.querySelectorAll('.error-text');
	console.log(formBox);
	formBox.forEach((el) => clearError(el));

	register.style.visibility = 'visible';
	login.style.visibility = 'hidden';

	welcomeRegister.style.visibility = 'visible';
	welcomeLogin.style.visibility = 'hidden';
}

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, pass, pass2, email]);
	checkLength(username, 3);
	checkLength(pass, 8);
	checkPassword(pass, pass2);
	checkEmail(email);
	checkErrors();
});

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	showLogin();
});

registerBtn.addEventListener('click', (e) => {
	e.preventDefault();
	showRegister();
});
