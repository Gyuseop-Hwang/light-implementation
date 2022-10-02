const addForm = document.querySelector('.form-box form');
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const userList = document.querySelector('.userlist ul')

// console.log(addForm)
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const enteredName = nameInput.value;
  const enteredAge = ageInput.value;
  if (enteredName.trim().length === 0) {

    return;
  }
  if (enteredAge.trim().length === 0) {
    return;
  }
  const El = document.createElement('li');
  El.innerHTML = `${enteredName} (${enteredAge}years old)`
  El.addEventListener('click', (evt) => {
    evt.currentTarget.remove();
  })
  userList.prepend(El);
  nameInput.value = "";
  ageInput.value = "";
})