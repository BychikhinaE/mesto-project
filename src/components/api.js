import { getResponse } from "../utils/utils.js";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Загрузка информации о пользователе с сервера
  startLoad = () => {
    console.log("startLoad");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(getResponse);
  };

  //Загрузка карточек с сервера
  loadCards = () => {
    console.log("loadCards");
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(getResponse);
  };

  // Редактирование профиля
  editProfile = (myProfile) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: myProfile.name,
        about: myProfile.about,
      }),
    }).then(getResponse);
  };

  // Редактирование аватарки
  editAvatar = (myProfile) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: myProfile.avatar,
      }),
    }).then(getResponse);
  };

  //Опубликовать новую карточку -промис
  postNewCard = (myPost) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: myPost.name,
        link: myPost.link,
      }),
    }).then(getResponse);
  };

  //Удалить карточку -промис
  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(getResponse);
  };

  //Постановка лайка
  plusLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(getResponse);
  };

  //Убираем лайк
  disLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(getResponse);
  };
}
