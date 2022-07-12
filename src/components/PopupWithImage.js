import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._fieldPhoto = this._element.querySelector(".popup__photo");
    this._fieldSubtitle = this._element.querySelector(".popup__subtitle");
  }

  open(card) {
    this._fieldPhoto.src = card.src;
    this._fieldSubtitle.textContent = card.alt;
    this._fieldPhoto.alt = card.alt;
    super.open();
  }
}
