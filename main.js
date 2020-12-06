var login = document.querySelector('#login');
var password = document.querySelector('#password');
var email = document.querySelector('#email');
var add = document.querySelector('#add');
var save = document.querySelector('#save');
var tbody = document.querySelector('#bodyTable');
var form = document.forms[0];
var User = /** @class */ (function () {
    function User(login, password, email, id) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.id = id;
    }
    ;
    return User;
}());
;
var users = [];
var currentUser;
function addUser() {
    var id = new Date().getTime();
    if (login.value && password.value && email.value) {
        users.push(new User(login.value, password.value, email.value, id));
        console.log(users);
        render();
        form.reset();
    }
    else {
        alert('Заповніть всі поля');
    }
}
;
function saveUser() {
    currentUser.email = email.value;
    currentUser.password = password.value;
    currentUser.login = login.value;
    form.reset();
    render();
    currentUser = null;
    hideButtons();
}
function edit(index) {
    currentUser = users[index];
    login.value = currentUser.login;
    email.value = currentUser.email;
    password.value = currentUser.password;
    hideButtons();
}
function remove(id) {
    users = users.filter(function (elem) { return elem.id != id; });
    render();
}
add.addEventListener('click', addUser);
save.addEventListener('click', saveUser);
function render() {
    tbody.innerHTML = users.reduce(function (html, elem, i) {
        return html + ("\n         <tr>\n         <th scope=\"row\">" + (i + 1) + "</th>\n         <td>" + elem.login + "</td>\n         <td>" + elem.password + "</td>\n         <td>" + elem.email + "</td>\n         <td><button class=\"btn btn-warning\" onclick=\"edit(" + i + ")\">Edit</button></td>\n         <td><button class=\"btn btn-danger\" onclick=\"remove(" + elem.id + ")\">Remove</button></td>\n         </tr>\n         ");
    }, '');
}
function hideButtons() {
    add.style.display = currentUser ? 'none' : 'block';
    save.style.display = currentUser ? 'block' : 'none';
}
