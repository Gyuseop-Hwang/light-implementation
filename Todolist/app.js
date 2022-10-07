const todoLists = document.querySelector('.todo-box ul');

const modalEl = document.querySelector('.modal');

const addButton = document.querySelector('.todo-box .btn.add');

const backdrop = document.querySelector('.backdrop');

const deleteMode = document.querySelector('.delete-mode')

const deleteCancelButton = document.querySelector('.delete-mode .actions .btn.cancel');

let todoListsArr = [
  { job: 'React', priority: 3 },
  { job: 'Node', priority: 2 },
  { job: 'Typescript', priority: 1 }
];


todoListsArr.sort((a, b) => a.priority - b.priority).forEach(todolist => {
  const liEl = document.createElement('li');
  liEl.innerHTML = `${todolist.priority}. ${todolist.job}`
  todoLists.append(liEl)
})

const backDropHandler = () => {
  backdrop.classList.toggle('on');
  modalEl.classList.toggle('on');
}

const cancelButtonHandler = (evt) => {
  evt.preventDefault();
  backDropHandler();
}

function confirmButtonHandler(evt) {
  evt.preventDefault();
  const inputs = this.closest('form').querySelectorAll('input');
  const job = inputs[0].value;
  const priority = inputs[1].value;
  todoListsArr.push({ job, priority });
  todoLists.innerHTML = "";
  todoListsArr.sort((a, b) => a.priority - b.priority).forEach(todolist => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${todolist.priority}. ${todolist.job}`
    todoLists.append(liEl)
  })
  backDropHandler();
}


const addListHandler = (evt) => {

  modalEl.innerHTML = `
  <h2>할 일과 우선순위를 입력하세요</h2>
    <form action="">
      <div class="form-control">
        <label for="todo">할 일 : </label>
        <input type="text" name="todo">
      </div>
      <div class="form-control">
        <label for="priority">우선순위 : </label>
        <input type="number" step="1" min="1" max="3" name="priority">
      </div>
      <div class="actions">
        <button class="btn cancel">Cancel</button>
        <button class="btn confirm">Confirm</button>
      </div>
    </form>
  `

  backDropHandler();

  const cancelButton = document.querySelector('.modal .actions .cancel');

  cancelButton.addEventListener('click', cancelButtonHandler)

  backdrop.addEventListener('click', backDropHandler);

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

const deleteModeHandler = (evt) => {

  backdrop.classList.toggle('delete')

  deleteMode.classList.toggle('on');

  addButton.disabled = true;
  addButton.classList.toggle('disabled')

  deleteButton.removeEventListener('click', deleteModeHandler);

  const newButton = document.importNode(deleteButton, true);

  deleteButton.textContent = 'save';

  todoLists.classList.toggle('deletemode')

  todoLists.addEventListener('click', selectHandler)

  deleteButton.addEventListener('click', (evt) => {
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
    addButton.disabled = false;
    addButton.classList.toggle('disabled')
    deleteButton.textContent = 'delete';
    todoLists.classList.toggle('deletemode')
    todoLists.removeEventListener('click', selectHandler)
    backdrop.classList.toggle('delete')
    deleteMode.classList.toggle('on');
    deleteButton.replaceWith(newButton);
    deleteButton = document.querySelector('.todo-box .btn.delete')
    deleteButton.addEventListener('click', deleteModeHandler)
  })

  // deleteCancelButton.addEventListener('click', () => {
  //   backdrop.classList.toggle('delete');
  //   deleteMode.classList.toggle('on');
  //   todoLists.removeEventListener('click', selectHandler)
  //   deleteButton.replaceWith(newButton);
  //   deleteButton = document.querySelector('.todo-box .btn.delete')
  //   deleteButton.addEventListener('click', deleteModeHandler)
  // })

}

let deleteButton = document.querySelector('.todo-box .btn.delete');

deleteButton.addEventListener('click', deleteModeHandler)