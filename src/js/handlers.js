import {arrOfTodos, arrOfUser} from './models';
import {
  getTodosFromLocalStorage,
  setTodosToLocalStorage,
  renderTodos,
  showCurrentUserData,
} from './methods';
import {Todo} from './models';

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
  if (target.dataset.role === 'delete') {
    const cardId = target.dataset.id;
    let numberOfTodo = 0;
    arrOfTodos.forEach((todo, index) => {
      if (todo.id == cardId) {
        numberOfTodo = index;
      }
    });
    arrOfTodos.splice(numberOfTodo, 1);
    setTodosToLocalStorage(arrOfTodos);
    renderTodos(arrOfTodos);
  }
}
