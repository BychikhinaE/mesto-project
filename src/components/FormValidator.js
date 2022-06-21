export default class FormValidator {
  //принимает в конструктор объект настроек с селекторами и классами формы;
  //вторым параметром - элемент той формы, которая валидируется;
  constructor( {formConfig}, formSelector ){
  this._formConfig = formConfig;
  this._formSelector = formSelector;
  }
  //имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
  //изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      })
    })
  }
  //имеет публичный метод enableValidation, который включает валидацию формы.
  enableValidation = () => {
    const formElement = document.querySelector(this._formSelector);
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
    this._setEventListeners(formElement, this._formConfig.inputSelector, this._formConfig.submitButtonSelector, this._formConfig.inactiveButtonClass, this._formConfig.inputErrorClass, this._formConfig.errorClass);
  }
}

//Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
