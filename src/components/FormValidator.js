export default class FormValidator {
  //принимает в конструктор объект настроек с селекторами и классами формы;
  //вторым параметром - элемент той формы, которая валидируется;
  constructor(formConfig, formSelector) {
    this._formConfig = formConfig;
    this._formSelector = formSelector;
  }
  //имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
  //изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _showInputError(elem) {
    elem.classList.add(this._formConfig.inputErrorClass);
    this._errorElement.textContent = elem.validationMessage;
    this._errorElement.classList.add(this._formConfig.errorClass);
  }

  _hideInputError(elem) {
    console.log(elem);
    elem.classList.remove(this._formConfig.inputErrorClass);
    this._errorElement.classList.remove(this._formConfig.errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(elem) {
    this._errorElement = this._formElement.querySelector(`.${elem.id}-error`);
    if (!elem.validity.valid) {
      this._showInputError(elem);
    } else {
      this._hideInputError(elem);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._formConfig.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._formConfig.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._formConfig.submitButtonSelector
    );

    // чтобы проверить состояние кнопки в самом начале
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this.toggleButtonState();
      });
    });
  }
  //имеет публичный метод enableValidation, который включает валидацию формы.
  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //Для каждой проверяемой формы создавайте экземпляр класса FormValidator.

  //находит и стирает сообщение об ошибке в форме при закрытии попапа
  dellInputErr() {
    if (
      this._inputList.some((input) => {
        return input.classList.contains("popup__input_type_error");
      })
    ) {
      this._inputList.forEach((item) => {
        item.classList.remove("popup__input_type_error");
      });

      this._errorElement.textContent = "";
    }
  }
}
