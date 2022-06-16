import {getResponse} from '../utils/utils.js'

class Api {
  constructor(options) {
    baseUrl = options.baseUrl,
    headers = options.headers
  }

//Загрузка информации о пользователе с сервера
startLoad = () => {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers
  })
  .then(getResponse)
}

//Загрузка карточек с сервера
loadCards = () => {return fetch(`${this.baseUrl}/cards`, {
    headers: this.headers
  })
  .then(getResponse)
}

// Редактирование профиля
editProfile = (myProfile) => {
  return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      name: myProfile.name,
      about: myProfile.about
    })
  })
  .then(getResponse)
}

// Редактирование аватарки
editAvatar = (myProfile) => {
  return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: myProfile.avatar
    })
  })
  .then(getResponse)
}

//Опубликовать новую карточку -промис
postNewCard = (myPost) => {
  return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: myPost.name,
      link: myPost.link
    })
  })
  .then(getResponse)
}

//Удалить карточку -промис
deleteCard = (cardId) => {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  })
  .then(getResponse)
}

//Постановка лайка
plusLike = (cardId)=> {
  return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this.headers
  })
  .then(getResponse)
}

//Убираем лайк
disLike = (cardId) => {
  return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  })
  .then(getResponse)
}
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
    'Content-Type': 'application/json'
  }
});
