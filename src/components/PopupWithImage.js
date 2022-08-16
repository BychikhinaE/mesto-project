import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._fieldPhoto = this._element.querySelector(".popup__photo");
    this._fieldSubtitle = this._element.querySelector(".popup__subtitle");
  }

  open(card) {
    this._fieldPhoto.src = card._url;
    this._fieldSubtitle.textContent = card._name;
    this._fieldPhoto.alt = card._name;
    super.open();
  }
}
