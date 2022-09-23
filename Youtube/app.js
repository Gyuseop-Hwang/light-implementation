const backDropButton = document.getElementById('back-drop-button')
const backDropObject = document.querySelector('.info .metadata .titleAndButton .title')

backDropButton.addEventListener('click', function (evt) {
  backDropObject.classList.toggle('drop')
  this.classList.toggle('clicked')
})

