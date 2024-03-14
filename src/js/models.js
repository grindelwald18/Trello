export const arrOfTodos = [];

export const arrOfUser = [];

export class Todo {
  id = Date.now();
  createdAt = new Date();
  status = 'todo';
  constructor(title, description, user) {
    this.title = title;
    this.description = description;
    this.user = user;
  }
}
