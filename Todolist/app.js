const todoLists = document.querySelector('.todo-box ul');

const addButton = document.querySelector('.todo-box .btn.add');

const addListHandler = () => {
  const liEl = document.createElement('li');
  const input = prompt('할 일을 입력하세요.')
  liEl.innerHTML = input;
  todoLists.append(liEl)
}

addButton.addEventListener('click', addListHandler)