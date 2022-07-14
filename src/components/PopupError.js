import Popup from './Popup.js'

export default class PopupError extends Popup {
  constructor(selector) {
  super(selector);
  this._fieldTextError = this._element.querySelector('.popup__title')
  }

  open(err) {
    this._fieldTextError.textContent = err;
    super.open()
  }
}
