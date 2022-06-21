
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector){
  super(selector)
  }

  open(url, name){
    super._element.querySelector('.popup__photo').src = url;
    super._element.querySelector('.popup__subtitle').textContent = name;
    super.open()
  }

}
