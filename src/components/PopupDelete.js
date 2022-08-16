import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(
    { selector, handleFormSubmit } //селектора попапа // колбэк сабмита формы.В этом колбэке содержится метод класса Api.
  ) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonDelete = this._element.querySelector("#questionDelete")
  }

  //Перезаписывает родительский метод setEventListeners
  setEventListeners(card) {
    this.callback = () => this._handleFormSubmit(card);
    this._buttonDelete.addEventListener("click", this.callback);
    super.setEventListeners();
  }

  close() {
    this._buttonDelete.removeEventListener("click", this.callback);
    super.close();
  }
}
