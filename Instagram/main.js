// import close from './assets/close_icon.svg';
// import media from './assets/media_icon.svg';
// import arrow from './assets/arrow_back_icon.svg';

// 아래처럼 변수로 안 하고 import하면 liveserver 구동 시 에러 발생 script 태그 안에 type="module" 추가했음.

const close = "./assets/close_icon.svg"
const media = "./assets/media_icon.svg"
const arrow = "./assets/arrow_back_icon.svg"

const modal = `
                <div class="modal__close">
                  <img
                  width="22px"
                  height="22px"
                  src=${close}
                  alt="close_icon_logo"
                  />
                </div>
                <div class="modal__card">
                  <div class="modal__header">
                    <div class="modal__back">
                      <img width="32px" height="24px" src=${arrow} alt="arrow_back_icon" />
                    </div>
                    <h2>새 게시물 만들기</h2>
                    <p>공유하기</p>
                  </div>
                  <div class="modal__main">
                    <img src=${media} alt="media_icon" />
                    <h3>사진과 동영상을 업로드 해보세요.</h3>
                    <label for="file">
                      <p>컴퓨터에서 선택</p>
                    </label>
                    <input type="file" name="file" id="file" />
                  </div>
                </div>
              `;
function createPost(img) {
  return `
          <div class="modal__post">
            <img width="478px" height="478px" src=${img} alt="image" />
            <div class="modal__write">
              <textarea placeholder="문구 입력..." autofocus></textarea>
            </div>
          </div>
        `;
}


// 지시사항에 맞춰 자바스크립트 코드를 작성하세요.
const addButton = document.querySelector('#add-post');

function createModal() {
  const modalEl = document.createElement('div');

  modalEl.setAttribute('class', 'modal__layout');
  modalEl.innerHTML = modal;
  document.body.prepend(modalEl);
  document.querySelector('.modal__close > img').addEventListener('click', () => {
    document.body.removeChild(modalEl)
  });
  const fileInput = document.querySelector('#file');
  fileInput.addEventListener('input', function () {
    const reader = new FileReader();

    reader.readAsDataURL(this.files[0]);

    reader.onload = function () {
      const imageBase64 = reader.result;
      document.querySelector('.modal__card').classList.add('write--post');

      document.querySelector('.modal__main').classList.add('write--post');
      const backBtn = document.querySelector('.modal__back > img')
      const shareBtn = document.querySelector('.modal__header p')
      backBtn.style.visibility = 'visible';
      shareBtn.style.visibility = 'visible';
      document.querySelector('.modal__main').innerHTML = createPost(imageBase64);
      backBtn.addEventListener('click', function () {
        modalEl.remove();
        createModal();
      })
    }
    reader.onerror = function () {
      alert('Error', error);
      modalEl.remove();
    }
  })
}

addButton.addEventListener('click', createModal)

