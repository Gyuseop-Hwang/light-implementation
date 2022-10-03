const addForm = document.querySelector('.form-box form');
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const userList = document.querySelector('.userlist ul')
const modalEl = document.querySelector('div.modal');
const template = document.querySelector('template')
const backDrop = document.querySelector('.backdrop');



let isError = false;
// console.log(addForm)
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const enteredName = nameInput.value;
  const enteredAge = ageInput.value;
  if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
    const title = "올바르지 않은 입력입니다."
    const message = "이름과 나이는 공백이여서는 안 됩니다."
    isError = { title, message }
  }

  else if (+enteredAge <= 0) {
    const title = "올바르지 않은 입력입니다."
    const message = "나이는 0보다 큰 양수여야 합니다."
    isError = { title, message }

  }

  if (isError) {


    const modalContent = document.importNode(template.content, true);

    modalContent.querySelector('h3').textContent = isError.title;
    modalContent.querySelector('p').textContent = isError.message;

    modalEl.append(modalContent)

    modalEl.classList.add('on');
    backDrop.classList.add('on');

    // modalEl.innerHTML = `
    //   <h3>${isError.title}</h3>
    //   <p>${isError.message}</p>
    //   <div>
    //     <button class="btn">확인</button>
    //   </div>
    // `
    backDrop.addEventListener('click', (evt) => {
      evt.currentTarget.classList.remove('on');
      modalEl.classList.remove('on');
      isError = false;
      modalEl.innerHTML = '';
    })

    modalEl.querySelector('button').addEventListener('click', (evt) => {
      modalEl.classList.remove('on');
      isError = false;
      modalEl.innerHTML = '';
      backDrop.classList.remove('on');
    });

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

