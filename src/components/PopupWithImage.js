import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, url, name) {
    super(selector);
    this._url = url;
    this._name = name;
  }

  open() {
    super._element.querySelector(".popup__photo").src = this._url;
    super._element.querySelector(".popup__subtitle").textContent = this._name;
    super.open();
  }
}
