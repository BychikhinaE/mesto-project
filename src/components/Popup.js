//отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(selector){
  this._selector = selector;
  this._element = document.querySelector(this._selector);
  this._buttonClose = this._element.querySelector('.popup__close');
  }

  //публичные методы open и close, которые отвечают за открытие и закрытие попапа
  open() {
    this._element.classList.add('popup_opened');
    this._element.addEventListener('click', this._closeClickBlack);
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('click', this._closeClickBlack);
    document.removeEventListener('keydown', this._handleEscClose)
  }

//содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    }
  }

  //Модальное окно также закрывается при клике на затемнённую область вокруг формы
  _closeClickBlack = (evt) => {
    if(evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }
  //публичный метод setEventListeners  добавляет слушатель клика иконке закрытия попапа.
  setEventListeners (){
    this._buttonClose.addEventListener('click', ()=>{
      this.close();
    })
  }
}
