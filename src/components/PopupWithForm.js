import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit,  objValid }) //селектора попапа
  // колбэк сабмита формы.В этом колбэке содержится метод класса Api.
  {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._elementForm = this._element.querySelector('.popup__form')
    this._formValid = objValid
     // достаём все элементы полей
    this._inputList = Array.from(this._element.querySelectorAll(".popup__input")
    );
  }

  //приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    // возвращаем объект значений
    return this._formValues;
  }

  //Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  //Перезаписывает родительский метод close
  close() {
    super.close();
    this._elementForm.reset();

    this._inputList.forEach(
      (inputElement) => {
        if(
          inputElement.classList.contains('popup__input_type_error')
          ){
          this._formValid.hideInputError(inputElement)}
        }
    );

    this._formValid.toggleButtonState();
  }
}


//Для каждого попапа создавайте свой экземпляр класса PopupWithForm
//Экземпляры классов создаются в файле index.js.
