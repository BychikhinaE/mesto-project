// инициализацию JS-кода, добавление слушателей и другие важные участки

import './pages/index.css'

import {closePopup, renderLoading} from './utils/utils.js'

import {showSpinner, popupProfile, formProfile, popupAvatar,   profileName, profileBio, formAvatar, profileAvatar, buttonSubmitProfile, buttonSubmitAvatar, showError} from './components/modal.js'

import {popupPlace, addCard, formPlace, buttonCreatePlace, buttonQuestionDelete, popupQuestionDelete, cardIdDelete} from './components/card.js'

import {enableValidation} from './components/validate.js'
import {startLoad, loadCards, editProfile, editAvatar,  postNewCard, deleteCard } from './components/Api.js'
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.bio;

//Заблюрить пока идет загрузка данных пользователя
showSpinner(true)
//Загрузить данные пользователя и карточки
Promise.all([startLoad() , loadCards()])
  .then(([userData, cards]) => {
      // тут установка данных пользователя
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    nameInput.value =userData.name;
    jobInput.value=userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    //В атрибуте сохраняем id , с которым далее будем сравнить авторство карточек
    profileName.dataset.myId =userData._id;

      // и тут отрисовка карточек
    cards.reverse().forEach((card)=>{
      addCard(card.name, card.link, card.likes, card.owner._id, card._id)
    })
  })
  .catch(err => {
    showError(err)
  })
  .finally(()=>{
    showSpinner(false)
  })

//Вызов валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

//Добавляем отслеживание отправки формы с информацией в профиле
formProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  renderLoading(true, buttonSubmitProfile)
  const { name, bio } = evt.currentTarget.elements;
  editProfile({
    name: name.value,
    about: bio.value
  })
  .then((res)=>{
    profileName.textContent = res.name;
    profileBio.textContent = res.about;
    closePopup(popupProfile);
  })
  .catch((err) => {
    showError(err)
  })
  .finally(()=>{
    renderLoading(false, buttonSubmitProfile)
  })
});

//Добавляем отслеживание отправки формы с изменением фото в профиле
formAvatar.addEventListener('submit', function(evt){
  evt.preventDefault();
  renderLoading(true, buttonSubmitAvatar)
  const {avatar} = evt.currentTarget.elements;
  editAvatar({
    avatar: avatar.value
  })
  .then((res)=>{
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    closePopup(popupAvatar);
    formAvatar.reset();
    buttonSubmitAvatar.classList.add('popup__button_disabled');
    buttonSubmitAvatar.disabled = true;
  })
  .catch((err) => {
    showError(err)
  })
  .finally(()=>{
    renderLoading(false, buttonSubmitAvatar);
  })
});

//Добавляем новую карточку из формы
formPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  showSpinner(true)
  const {namePlace, link} = evt.currentTarget.elements;
  postNewCard({
    name: namePlace.value,
    link: link.value
  })
  .then((card) => {
    addCard(card.name, card.link, card.likes, card.owner._id, card._id);
    closePopup(popupPlace);
    formPlace.reset();
    buttonCreatePlace.classList.add('popup__button_disabled');
    buttonCreatePlace.disabled = true;
  })
  .catch((err) => {
    showError(err)
  })
  .finally(()=>{
    showSpinner(false);
  })
})



//Слушаем ответ на вопрос об удалении карточки
buttonQuestionDelete.addEventListener('click', function (evt) {
  evt.preventDefault();
  deleteCard(cardIdDelete)
  .then(()=>
    {closePopup(popupQuestionDelete);
    document.querySelector(`[data-card-id="${cardIdDelete}"]`).remove()}
  )
  .catch((err) => {
    showError(err)
  })
})
