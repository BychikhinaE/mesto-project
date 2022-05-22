import {profileName, profileBio, profileAvatar, formProfile} from './modal.js'
import {getResponse,showError} from './utils.js'


//Загрузка информации о пользователе с сервера
export function startLoad() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-10/users/me', {
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36'
      }
  })
}

//Загрузка карточек с сервера
export function loadCards() {return fetch('https://nomoreparties.co/v1/plus-cohort-10/cards', {
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36'
      }
  })
}

// Редактирование профиля
export function editProfile(myProfile){
  return fetch('https://nomoreparties.co/v1/plus-cohort-10/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: myProfile.name,
      about: myProfile.about
    })
  })
}

// Редактирование аватарки
export function editAvatar(myProfile){
  return fetch('https://nomoreparties.co/v1/plus-cohort-10/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: myProfile.avatar
    })
  })
}

//Опубликовать новую карточку -промис
export function postNewCard(myPost){
  return fetch('https://nomoreparties.co/v1/plus-cohort-10/cards', {
    method: 'POST',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: myPost.name,
      link: myPost.link
    })
  });
}

//Удалить карточку -промис
export function deleteCard(cardId){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-10/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36'
    }
  });
}

//Постановка лайка
export function plusLike(cardId){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-10/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36'
    }
  });
}

//Убираем лайк
export function disLike(cardId){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-10/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ae17cf5f-30f7-49c5-80a6-f47193e26f36'
    }
  });
}

