export const modalTemplate = `
<h2>할 일과 우선순위를 입력하세요</h2>
  <form action="">
    <div class="form-control">
      <label for="todo">할 일 : </label>
      <input type="text" name="todo">
    </div>
    <div class="form-control">
      <label for="priority">우선순위 : </label>
      <input type="number" step="1" min="1" max="5" name="priority">
    </div>
    <div class="actions">
      <button class="btn cancel">Cancel</button>
      <button class="btn confirm">Confirm</button>
    </div>
  </form>
`