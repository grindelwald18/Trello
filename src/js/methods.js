import {arrOfUser} from './models.js';

export function getTodosFromLocalStarage(arrOfTodos) {
  const todosJSON = localStorage.getItem('todos');
  if (todosJSON) {
    const todosFromString = JSON.parse(todosJSON);
    arrOfTodos.length = 0;
    todosFromString.forEach(element => {
      arrOfTodos.push(element);
    });
  }
}

export function setTodosToLocalStorage(arrOfTodos) {
  const todosJSON = JSON.stringify(arrOfTodos);
  localStorage.setItem('todos', todosJSON);
}

export function getUser() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        arrOfUser.push(user);
      });
      addUserToForm(arrOfUser);
    });
}

function addUserToForm(arrOfUser) {
  const select = document.querySelector('#select');
  let html = ``;
  arrOfUser.forEach(user => {
    html += `<option value="${user.id}">${user.name}</option>`;
  });
  select.insertAdjacentHTML('beforeend', html);
}
