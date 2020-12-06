const login: HTMLInputElement = document.querySelector('#login');
const password: HTMLInputElement = document.querySelector('#password');
const email: HTMLInputElement = document.querySelector('#email');
const add: HTMLButtonElement = document.querySelector('#add');
const save: HTMLButtonElement = document.querySelector('#save');
const tbody: HTMLTableElement = document.querySelector('#bodyTable');
const form: HTMLFormElement = document.forms[0];

class User {
    constructor(
        public login: string,
        public password: string,
        public email: string,
        public id: number
    ) {};
};

let users: User[] = [];
let currentUser: User;

function addUser(): void {
    let id = new Date().getTime();
    if (login.value && password.value && email.value) {
        users.push(new User(login.value, password.value, email.value, id));
        console.log(users);
        render();
        form.reset();
    } else {
        alert('Заповніть всі поля');
    }
};

function saveUser(): void {
    currentUser.email = email.value;
    currentUser.password = password.value;
    currentUser.login = login.value;
    form.reset();
    hideButtons();
    render();
    currentUser = null;
}

function edit(index: number): void {
    currentUser = users[index];
    login.value = currentUser.login;
    email.value = currentUser.email;
    password.value = currentUser.password;
    hideButtons();
}

function remove(id: number): void {
    users = users.filter(elem => elem.id != id);
    render();
}

add.addEventListener('click', addUser);
save.addEventListener('click', saveUser);

function render(): void {
    tbody.innerHTML = users.reduce((html, elem, i) => {
        return html + `
         <tr>
         <th scope="row">${i + 1}</th>
         <td>${elem.login}</td>
         <td>${elem.password}</td>
         <td>${elem.email}</td>
         <td><button class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
         <td><button class="btn btn-danger" onclick="remove(${elem.id})">Remove</button></td>
         </tr>
         `
    }, '');
}


function hideButtons(): void {
    add.style.display = currentUser ? 'hide' : 'block';
    save.style.display = currentUser ? 'block' : 'hide';
}
