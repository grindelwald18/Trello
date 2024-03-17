import {arrOfUser, arrOfTodos} from './models.js';
import {Modal, Dropdown} from 'bootstrap';

export function getTodosFromLocalStorage(arrOfTodos) {
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
        renderTodos(arrOfTodos);
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

export function showCurrentUserData(id) {
  const select = document.querySelector('#edit-select');
  const title = document.querySelector('#edit-title');
  const description = document.querySelector('#edit-description');

  todo = arrOfTodos.find(obj => obj.id === id);
  title.value = todo.title;
  description.value = todo.description;

  let html = '';
  const options = [];
  arrOfUser.forEach(obj => {
    if (obj.id === todo.user.id) {
      options.unshift(`<option value="${obj.id}">${obj.name}</option>`);
    } else {
      options.push(`<option value="${obj.id}">${obj.name}</option>`);
    }
  });
  options.forEach(option => {
    html += option;
  });
  select.innerHTML = html;

  const modal = document.querySelector('#secondModal');
  const modalInstance = new Modal(modal);
  modalInstance.show();
}

export function renderTodos(arrOfTodos) {
  getTodosFromLocalStorage(arrOfTodos);
  const arrOfSection = ['todo', 'inProgress', 'done'];
  arrOfSection.forEach(nameOfSection => {
    const counter = document.querySelector(`#${nameOfSection}__counter`);
    counter.textContent = 0;
    const cardSection = document.querySelector(`#${nameOfSection}`);
    while (cardSection.firstChild) {
      cardSection.firstChild.remove();
    }
  });

  arrOfTodos.forEach(todo => {
    const counter = document.querySelector(`#${todo.status}__counter`);
    const value = Number(counter.textContent);
    counter.textContent = value + 1;
    const template = buildTemplate(todo);
    const sectionOfTodo = document.querySelector(`#${todo.status}`);
    sectionOfTodo.insertAdjacentHTML('beforeend', template);
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(function (element) {
      element.addEventListener('dragstart', drag);
    });
  });
}

export function currentDate(date) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const dateObject = new Date(date);

  return `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getHours()}:${
    dateObject.getMinutes() < 10 ? `0${dateObject.getMinutes()}` : dateObject.getMinutes()
  }`;
}

export function buildTemplate({id, title, description, user, createdAt, status}) {
  const date = currentDate(createdAt);
  const cardTemplate = `

      <div class="card draggable" draggable="true" data-id="${id}">
        <div class="card-info">
          <div class="card__title">${title}</div>
          <div class="card__description">${description}</div>
          <div class="more-info ${status}">
            <div class="executor">${user.name}</div>
            <div class="createdAt">${date}</div>
          </div>
        </div>
        <div class="card__menu">
          <button class="menu-btn delete" data-role="delete" data-id="${id}">X</button>
          <button class="menu-btn edit" data-role="edit" data-id="${id}" >EDIT</button>
        </div>
      </div>
        `;
  return cardTemplate;
}

export function allowDrop(event) {
  event.preventDefault();
}

export function drag(event) {
  event.dataTransfer.setData('id', event.target.dataset.id);
}

export function drop(event) {
  let elementId = event.dataTransfer.getData('id');
  const card = arrOfTodos.find(element => element.id == elementId);
  card.status = event.currentTarget.dataset.status;
  setTodosToLocalStorage(arrOfTodos);
  renderTodos(arrOfTodos);
}
