import { modalTemplate } from './template/modalTemplate.js';

const todoLists = document.querySelector('.todo-box ul');
const modalEl = document.querySelector('.modal');
const addButton = document.querySelector('.todo-box .btn.add');
const backdrop = document.querySelector('.backdrop');
const deleteMode = document.querySelector('.delete-mode')
let deleteCancelButton = document.querySelector('.delete-mode .actions .btn.cancel');
let deleteButton = document.querySelector('.todo-box .btn.delete');

let todoListsArr = [
  { job: 'React', priority: 3 },
  { job: 'Node', priority: 2 },
  { job: 'Typescript', priority: 1 }
];

const todoListsArrRender = () => {
  todoListsArr.sort((a, b) => a.priority - b.priority).forEach(todolist => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${todolist.priority}. ${todolist.job}`
    todoLists.append(liEl)
  })
}

todoListsArrRender();

const backDropController = () => {
  backdrop.classList.toggle('on');
  modalEl.classList.toggle('on');
}

const cancelButtonHandler = (evt) => {
  evt.preventDefault();
  backDropController();
}

function confirmButtonHandler(evt) {
  evt.preventDefault();
  const inputs = this.closest('form').querySelectorAll('input');
  const [job, priority] = [inputs[0].value, inputs[1].value];
  // const job = inputs[0].value;
  // const priority = inputs[1].value;
  todoListsArr.push({ job, priority });
  todoLists.innerHTML = "";
  todoListsArrRender();
  backDropController();
}


const addListHandler = (evt) => {
  modalEl.innerHTML = modalTemplate;
  backDropController();
  const cancelButton = document.querySelector('.modal .actions .cancel');
  cancelButton.addEventListener('click', cancelButtonHandler)
  backdrop.addEventListener('click', backDropController);
  const confirmButton = document.querySelector('.modal .actions .confirm');
  confirmButton.addEventListener('click', confirmButtonHandler)
}

addButton.addEventListener('click', addListHandler)


const selectHandler = (evt) => {
  evt.target.classList.toggle('delete-select')
  const value = evt.target.innerHTML.slice(3);
  const idx = todoListsArr.findIndex(todo => todo.job === value);
  if (todoListsArr[idx]) {
    todoListsArr[idx].delete = true;
  }
}

const deleteModeController = (boolean = true) => {
  addButton.disabled = boolean
  addButton.classList.toggle('disabled');
  backdrop.classList.toggle('delete');
  deleteMode.classList.toggle('on');
  todoLists.classList.toggle('deletemode');
  todoLists.removeEventListener('click', selectHandler);
}

function deleteCancelButtonHandler(button) {
  deleteModeController(false);
  // addButton.disabled = false;
  // addButton.classList.toggle('disabled')
  // backdrop.classList.toggle('delete');
  // deleteMode.classList.toggle('on');
  // todoLists.classList.toggle('deletemode');
  // todoLists.removeEventListener('click', selectHandler);
  const allTodos = todoLists.querySelectorAll('li');
  allTodos.forEach(todo => {
    todo.classList.remove('delete-select')
  })
  todoListsArr.forEach(todo => {
    delete todo.delete;
  })
  deleteButton.replaceWith(button);
  deleteButton = document.querySelector('.todo-box .btn.delete')
  deleteButton.addEventListener('click', deleteModeHandler)
  // this.removeEventListener('click', deleteCancelButtonHandler);
}

function saveButtonHandler(button) {
  todoListsArr = todoListsArr.filter(todo => !todo.delete);
  const allTodos = todoLists.querySelectorAll('li');
  allTodos.forEach(todo => {
    if (todo.classList.contains('delete-select')) {
      todo.remove();
    }
  })
  // const allTodos = todoLists.children;
  // const length = allTodos.length;
  // for (let i = 0; i <= length; i++) {
  //   if (allTodos[i].classList.contains('delete-select')) {
  //     allTodos[i].remove();
  //   }
  // }
  deleteModeController(false)

  deleteButton.replaceWith(button);
  deleteButton = document.querySelector('.todo-box .btn.delete')
  const newCancelButton = deleteCancelButton.cloneNode(true);
  deleteCancelButton.replaceWith(newCancelButton);
  deleteCancelButton = document.querySelector('.delete-mode .actions .btn.cancel')
  // deleteCancelButton.addEventListener('click', deleteCancelButtonHandler.bind(deleteCancelButton, newButton), { once: true })
  deleteButton.addEventListener('click', deleteModeHandler)
}

const deleteModeHandler = (evt) => {

  deleteModeController();

  deleteButton.removeEventListener('click', deleteModeHandler);
  const newButton = document.importNode(deleteButton, true);
  deleteButton.textContent = 'save';
  todoLists.addEventListener('click', selectHandler)
  deleteCancelButton.addEventListener('click', deleteCancelButtonHandler.bind(deleteCancelButton, newButton), { once: true })

  deleteButton.addEventListener('click', saveButtonHandler.bind(deleteButton, newButton))

}


deleteButton.addEventListener('click', deleteModeHandler)