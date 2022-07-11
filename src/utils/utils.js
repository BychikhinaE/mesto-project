// утилитарные функции, которые используются в работе сразу нескольких других функций
import PopupError from "../components/PopupError.js";
import { spinner, content } from "./constants.js";

//Функция проверки ответа с сервера на ошибки
export function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

//Функция меняет текст на кнопке 'Сохранить'
export function renderLoading(isLoading, currentButton) {
  if (isLoading) {
    currentButton.textContent = "Сохранение...";
  } else {
    currentButton.textContent = "Сохранить";
  }
}

//Спиннерзагрузки
export function showSpinner(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden");
  }
}

//Функция для вывода ошибки на экран
export function showError(err) {
  const popupError = new PopupError(".popup_type_error", err);
  popupError.open();
  popupError.setEventListeners();
}
