import Popup from './Popup.js'

export default class PopupError extends Popup {
  constructor(selector, text){
  super(selector);
  this._text = text;
  }

  open () {
    this._element = super._getElement();
    this._element.querySelector('.popup__title').textContent = this._text;
    super.open()
  }
}
