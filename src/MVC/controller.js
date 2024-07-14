/* eslint-env browser */

export default class Controller {
  constructor(model) {
    this.model = model;
    this.formContainer = document.getElementById('form-container');
  }

  addHandlers = () => {
    this.formContainer.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const inputValue = formData.get('input');

      this.model.updateState(inputValue);
    });
  };
}
