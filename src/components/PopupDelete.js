import Popup from './Popup.js'

export default class PopupDelete extends Popup {
  constructor({selector, handleFormSubmit}
//селектора попапа
// колбэк сабмита формы.В этом колбэке содержится метод класса Api.
  ){
super(selector)
this._handleFormSubmit = handleFormSubmit;
  }

  // open() {
  //   this._element = super._getElement();
  //   super.open()
  // }
  //Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса
  //PopupWithForm должен не только
  //добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    this._element = super._getElement();
    this._element.querySelector('#questionDelete').addEventListener('click', this._handleFormSubmit)
    super.setEventListeners()
  }

  close() {
    this._element.querySelector('#questionDelete').removeEventListener('click', this._handleFormSubmit);
    super.close()
  }
}
