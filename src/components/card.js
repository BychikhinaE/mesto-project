// функции для работы с карточками проекта Mesto
//объявить функию для создания карточки
import {closePopup, openPopup} from './utils';

export const newPlace = document.querySelector('.popup_type_place');
const namePlace = newPlace.querySelector('#namePlace');
const link = newPlace.querySelector('#link');
const cardsContainer = document.querySelector('.elements');
const fullPhoto = document.querySelector('.popup_type_photo');
const popupPhoto = fullPhoto.querySelector('.popup__photo');
const subtitlePhoto = fullPhoto.querySelector('.popup__subtitle');
const buttonAdd = document.querySelector('.profile__add');

 //добавить кнопкe Плюс_карточка функцию Открыть попап
 buttonAdd.addEventListener('click', function () {
  openPopup(newPlace);
});

//Функция создания новой карточки
function createCard(nameValue, urlValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardLike = cardElement.querySelector('.elements__like');
  const cardPhoto = cardElement.querySelector('.elements__photo');
  const deleteButton = cardElement.querySelector('.elements__delete');

  cardElement.querySelector('.elements__title').textContent = nameValue;
  cardPhoto.alt = nameValue;
  cardPhoto.src = urlValue;

  cardLike.addEventListener('click', function () {
    cardLike.classList.toggle('elements__like_act');
  });

  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  cardPhoto.addEventListener('click', function () {
    popupPhoto.src = urlValue;
    popupPhoto.alt = nameValue;
    subtitlePhoto.textContent = nameValue;
    openPopup(fullPhoto);
    });

  return cardElement;
};

//объявить функию для добавления карточки
function addCard(nameValue, urlValue) {
  cardsContainer.prepend(createCard(nameValue, urlValue));
}

 // Обработчик публикации новой карточки из формы
 export function submitCard(evt) {
  evt.preventDefault();
  addCard(namePlace.value, link.value);
  closePopup(newPlace);
  newPlace.querySelector('#formPlace').reset();
};



//Шесть карточек «из коробки»
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
];

initialCards.forEach(function(item){
  addCard(item.name, item.link);
});

