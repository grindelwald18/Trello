import {arrOfTodos, arrOfUser} from './models';
import {
  getTodosFromLocalStorage,
  setTodosToLocalStorage,
  renderTodos,
  showCurrentUserData,
} from './methods';
import {Todo} from './models';
import {Modal} from 'bootstrap';

export function submitAddTodoForm(event) {
  event.preventDefault();
  getTodosFromLocalStorage(arrOfTodos);
  const formData = new FormData(event.currentTarget);
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const user = arrOfUser.find(obj => obj.id == data.user);
  const todo = new Todo(data.title, data.description, user);
  arrOfTodos.push(todo);
  setTodosToLocalStorage(arrOfTodos);
  renderTodos(arrOfTodos);
  event.currentTarget.reset();
}

export function submitEditForm(event) {
  event.preventDefault();
  getTodosFromLocalStorage(arrOfTodos);
  const todoId = event.target.dataset.user_id;
  const formData = new FormData(event.currentTarget);
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const user = arrOfUser.find(obj => obj.id == data.user);
  arrOfTodos.forEach(obj => {
    if (obj.id == todoId) {
      obj.title = data.title;
      obj.description = data.description;
      obj.user = user;
    }
  });
  setTodosToLocalStorage(arrOfTodos);
  renderTodos(arrOfTodos);
  event.currentTarget.reset();
}

export function handelClickEditButton({target}, id) {
  if (target.dataset.role === 'edit') {
    const editFormElement = document.querySelector('#edit-form');
    editFormElement.dataset.user_id = target.dataset.id;
    showCurrentUserData(Number(target.dataset.id));
  }
}

export function handleClickDeleteButton({target}) {
  let cardId = target.dataset.id;
  if (target.dataset.role === 'delete') {
    const modal = document.querySelector('#approvedModal');
    const modalInstance = new Modal(modal);
    modalInstance.show();
    getTodosFromLocalStorage(arrOfTodos);
    const confirmButton = modal.querySelector('.btn-primary');
    confirmButton.addEventListener('click', () => {
      console.log(cardId);
      arrOfTodos.forEach((todo, index) => {
        console.log(index);
        if (todo.id == cardId) {
          console.log('нужный номер', index);
          arrOfTodos.splice(index, 1);
        }
      });
      setTodosToLocalStorage(arrOfTodos);
      renderTodos(arrOfTodos);
    });
  }
}

export function handleClickDeleteAllDoneTodosButton() {
  getTodosFromLocalStorage(arrOfTodos);
  const filteredTodos = arrOfTodos.filter(todo => todo.status !== 'done');
  arrOfTodos.length = 0;
  filteredTodos.forEach(todo => {
    arrOfTodos.push(todo);
  });
  setTodosToLocalStorage(arrOfTodos);
  renderTodos(arrOfTodos);
}
