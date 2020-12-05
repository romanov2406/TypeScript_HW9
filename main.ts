class User {
    constructor(
        public login: string,
        public password: string,
        public email: string,
        public id: number
    ) {};
};

let login: HTMLInputElement = document.querySelector('#login');
let password: HTMLInputElement = document.querySelector('#password');
let email: HTMLInputElement = document.querySelector('#email');
let add: HTMLButtonElement = document.querySelector('#add');
let save: HTMLButtonElement = document.querySelector('#save');
const tbody: HTMLTableElement = document.querySelector('#bodyTable');
const form: HTMLFormElement = document.forms[0];
let users: User[] = [];

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

function hideButtons(selector){
  [add,save].forEach(elem =>  elem.style.display = 'none');
  selector.style.display = 'block';
}

function saveUser(): void {
users[currentUser].email = email.value
users[currentUser].password = password.value
users[currentUser].login = login.value
form.reset();
hideButtons(add);
render();
}
let currentUser: number;

function edit(index): void {
    currentUser = index;
    console.log(currentUser);
    
    login.value = users[index].login
    email.value = users[index].email
    password.value = users[index].password
    // add.style.display = 'none';
    // save.style.display = 'block';
    hideButtons(save);
}

function remove(id: number): void {
    users = users.filter(elem => elem.id != id);
    render();
}
add.addEventListener('click', addUser);
save.addEventListener('click', saveUser);