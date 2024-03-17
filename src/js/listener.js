import {
  submitAddTodoForm,
  handelClickEditButton,
  submitEditForm,
  handleClickDeleteButton,
} from './handlers';
import {allowDrop, drag, drop} from './methods.js';

const formElement = document.querySelector('#add-form');
const editFormElement = document.querySelector('#edit-form');
const wrapper = document.querySelector('#wrapper');
const sectionOfTodo = document.querySelector('#todo');
const sectionOfInProgress = document.querySelector('#inProgress');
const sectionOfDone = document.querySelector('#done');

sectionOfTodo.ondragover = allowDrop;
sectionOfInProgress.ondragover = allowDrop;
sectionOfDone.ondragover = allowDrop;

sectionOfTodo.ondrop = drop;
sectionOfInProgress.ondrop = drop;
sectionOfDone.ondrop = drop;

formElement.addEventListener('submit', submitAddTodoForm);
editFormElement.addEventListener('submit', submitEditForm);
wrapper.addEventListener('click', handelClickEditButton);
wrapper.addEventListener('click', handleClickDeleteButton);
