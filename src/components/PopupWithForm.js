import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}
//селектора попапа
// колбэк сабмита формы.В этом колбэке содержится метод класса Api.
  ){
super(selector)
this._handleFormSubmit = handleFormSubmit;
  }

  //приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value
    );
    // возвращаем объект значений
    return this._formValues;
  }

  //Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса
  //PopupWithForm должен не только
  //добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    this._element = super._getElement();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
    })
    super.setEventListeners()
  }
  //Перезаписывает родительский метод close,
  //так как при закрытии попапа форма должна ещё и сбрасываться.
  close()  {
    super.close();
    this._element.querySelector('.popup__form').reset();

    //находит и стирает сообщение об ошибке в форме при закрытии попапа

    if(Array.from(this._element.querySelectorAll('.popup__input'))
    .some((input)=>{return input.classList.contains('popup__input_type_error')})){
      console.log("костыль по стиранию ошибок в форме")

      Array.from(this._element.querySelectorAll('.popup__input_type_error'))
      .forEach((item)=>{item.classList.remove('popup__input_type_error')})

      Array.from(this._element.querySelectorAll('.popup__error_visible'))
      .forEach((item)=>{item.classList.remove('popup__error_visible')})

    }
  }
}



//Для каждого попапа создавайте свой экземпляр класса PopupWithForm
//Экземпляры классов создаются в файле index.js.
