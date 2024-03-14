import {arrOfTodos, arrOfUser} from './models';
import {getTodosFromLocalStarage, setTodosToLocalStorage} from './methods';
import {Todo} from './models';
export function handelClickAddTodoButton(event) {
  event.preventDefault();
  getTodosFromLocalStarage(arrOfTodos);
  const formData = new FormData(event.currentTarget);
  let data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });
  // console.log(data.user);
  const user = arrOfUser.find(obj => obj.id == data.user);
  console.log(user);
  const todo = new Todo(data.title, data.description, user);
  arrOfTodos.push(todo);
  setTodosToLocalStorage(arrOfTodos);
  // renderTodos();
}
