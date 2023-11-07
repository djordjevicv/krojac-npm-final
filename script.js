//IMPORTED VARIABLES

const bcrypt = require('bcryptjs');


//GLOBAL VARIABLES

const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const emailInput = document.querySelector('#exampleInputEmail1');
const usernameInput = document.querySelector('#exampleInputUsername1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const secureButton = document.querySelector('#secure');

class User {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

const data = [
    new User('pera@gmail.com', 'pera', 'pera123'),
    new User('mika@gmail.com', 'mika', 'mika123'),
    new User('laza@gmail.com', 'laza', 'pera123'),
];

let isSecured = false;


//FUNCTIONS

const isFormDataValid = (email, username, password) => {
    if (!(email.toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) ||
        username === '' ||
        password === '') {
        return false;
    }
    return true;
}

const clearForm = () => {
    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
}

const createAndPopulateTableRow = (index, email, username, password) => {
    const tr = document.createElement("tr");

    const indexField = document.createElement("th");
    indexField.textContent = `${index + 1}`;
    indexField.setAttribute('scope', 'row');

    const emailField = document.createElement("td");
    emailField.textContent = email;

    const usernameField = document.createElement("td");
    usernameField.textContent = username;

    const passwordField = document.createElement("td");
    passwordField.textContent = password;

    tr.append(indexField);
    tr.append(usernameField);
    tr.append(emailField);
    tr.append(passwordField);

    return tr;
}

const secureTheData = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    password = bcrypt.hashSync(user.password, salt);

    return password;
}


//EVENT LISTENERS

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (e.submitter.id !== 'submitButton')
        return;

    if (!isFormDataValid(emailInput.value,
        usernameInput.value,
        passwordInput.value)) {
        alert('uneti podaci nisu validni');
        return;
    }

    let passwordToInsert = isSecured ?
        bcrypt.hashSync(passwordInput.value) : passwordInput.value;

    data.push(new User(emailInput.value,
        usernameInput.value,
        passwordToInsert
    ));

    const tr = createAndPopulateTableRow(data.length - 1,
        emailInput.value,
        usernameInput.value,
        passwordToInsert
    );

    clearForm();

    tbody.append(tr);
});

window.addEventListener('load', () => {
    data.forEach((user, index) => {
        tbody.append(createAndPopulateTableRow(index,
            user.email,
            user.username,
            user.password
        ));
    });
});

secureButton.addEventListener('click', () => {

    if (isSecured) return;

    isSecured = true;

    tbody.innerHTML = '';

    data.forEach((user, index) => {

        secureTheData(user.password);

        tbody.append(createAndPopulateTableRow(index,
            user.email,
            user.username,
            user.password
        ));
    });
});



