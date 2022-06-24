import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, url, name) {
    super(selector);
    this._url = url;
    this._name = name;
  }

  open() {
    this._element = super._getElement();
    this._element.querySelector(".popup__photo").src = this._url;
    this._element.querySelector(".popup__subtitle").textContent = this._name;
    super.open();
  }
}
