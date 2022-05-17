// инициализацию JS-кода, добавление слушателей и другие важные участки
//вызов функции enableValidation туть
import './pages/index.css'

import {formProfile, submitProfile} from './components/modal.js'

import {newPlace, submitCard} from './components/card.js'

import {enableValidation} from './components/validate.js'

formProfile.addEventListener('submit', submitProfile);

newPlace.addEventListener('submit', submitCard);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
