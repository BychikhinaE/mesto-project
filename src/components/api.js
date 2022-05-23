import {getResponse} from './utils.js'

const projectApiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
    'Content-Type': 'application/json'
  }
}

//Загрузка информации о пользователе с сервера
export function startLoad() {
  return fetch(`${projectApiConfig.baseUrl}/users/me`, {
    headers: projectApiConfig.headers
  })
  .then(getResponse)
}

//Загрузка карточек с сервера
export function loadCards() {return fetch(`${projectApiConfig.baseUrl}/cards`, {
    headers: projectApiConfig.headers
  })
  .then(getResponse)
}

// Редактирование профиля
export function editProfile(myProfile){
  return fetch(`${projectApiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: projectApiConfig.headers,
    body: JSON.stringify({
      name: myProfile.name,
      about: myProfile.about
    })
  })
  .then(getResponse)
}

// Редактирование аватарки
export function editAvatar(myProfile){
  return fetch(`${projectApiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: projectApiConfig.headers,
    body: JSON.stringify({
      avatar: myProfile.avatar
    })
  })
  .then(getResponse)
}

//Опубликовать новую карточку -промис
export function postNewCard(myPost){
  return fetch(`${projectApiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: projectApiConfig.headers,
    body: JSON.stringify({
      name: myPost.name,
      link: myPost.link
    })
  })
  .then(getResponse)
}

//Удалить карточку -промис
export function deleteCard(cardId){
  return fetch(`${projectApiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: projectApiConfig.headers
  })
  .then(getResponse)
}

//Постановка лайка
export function plusLike(cardId){
  return fetch(`${projectApiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: projectApiConfig.headers
  })
  .then(getResponse)
}

//Убираем лайк
export function disLike(cardId){
  return fetch(`${projectApiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: projectApiConfig.headers
  })
  .then(getResponse)
}

