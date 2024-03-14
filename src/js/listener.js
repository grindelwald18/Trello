import {handelClickAddTodoButton} from './handlers';

const formElement = document.querySelector('#add-form');

formElement.addEventListener('submit', handelClickAddTodoButton);
