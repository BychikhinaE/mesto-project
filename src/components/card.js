// функции для работы с карточками проекта Mesto
//объявить функию для создания карточки
import { openPopup } from "../utils/utils";
import { profileName } from "./modal.js";
//import { plusLike, disLike } from "./api";

export const popupPlace = document.querySelector(".popup_type_place");
export const popupQuestionDelete = document.querySelector(".popup_type_delete");
export const buttonQuestionDelete =
  popupQuestionDelete.querySelector("#questionDelete");
export const formPlace = document.forms.formPlace;
export const buttonCreatePlace = formPlace.querySelector(".popup__button");
export const cardsContainer = document.querySelector(".elements");
const fullPhoto = document.querySelector(".popup_type_photo");
const popupPhoto = fullPhoto.querySelector(".popup__photo");
const subtitlePhoto = fullPhoto.querySelector(".popup__subtitle");
const buttonAdd = document.querySelector(".profile__add");
const cardTemplate = document.querySelector("#card-template").content;
export let cardIdDelete = 0;

export const selector = ".elements__card";
//добавить кнопкe Плюс_карточка функцию Открыть попап
buttonAdd.addEventListener("click", function () {
  openPopup(popupPlace);
});

//Функция создания новой карточки
//createCard(nameValue, urlValue, countLike, ownerId, card_id)
//           card.name, card.link, card.likes, card.owner._id, card._id

export class Card {
  constructor(data, selector) {
    this._nameValue = data.name;
    this._urlValue = data.link;
    this._countLike = data.likes;
    this._ownerId = data.owner._id;
    this._card_id = data._id;
    this._selector = selector;
  }

  _getElement() {
    console.log("_getElement");
    //  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
    //  const cardElement = document.querySelector(templateSelector).content.querySelector('.elements__card').cloneNode(true);
    const cardElement = cardTemplate
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    console.log("generate");
    this._element = this._getElement();
    this._element.querySelector(".elements__title").textContent =
      this._nameValue;
    this._element.querySelector(".elements__photo").alt = this._nameValue;
    this._element.querySelector(".elements__photo").src = this._urlValue;
    this._element.querySelector(".elements__count-like").textContent =
      this._countLike.length;
    console.log(this._element);
    // this._element.dataset.cardOwnerId = ownerId;
    //this._element.dataset.cardId = card_id;

    return this._element;
  }

  /*
  _dell() {
    //Иконка удалить
    if (cardElement.dataset.cardOwnerId !== profileName.dataset.myId) {
      deleteButton.style.display = "none";
    } else {
      deleteButton.style.display = "block";
      deleteButton.addEventListener("click", function () {
        openPopup(popupQuestionDelete);
        cardIdDelete = cardElement.dataset.cardId;
      });
    }
  }
  _like() {
    //like
    if (
      countLike.some(function (item) {
        return item._id === profileName.dataset.myId;
      })
    ) {
      cardLike.classList.add("elements__like_act");
    }

    cardLike.addEventListener("click", function () {
      if (cardLike.classList.contains("elements__like_act")) {
        disLike(cardElement.dataset.cardId)
          .then((res) => {
            cardCountLike.textContent = res.likes.length;
            cardLike.classList.remove("elements__like_act");
          })
          .catch((err) => {
            showError(err);
          });
      } else {
        plusLike(cardElement.dataset.cardId)
          .then((res) => {
            cardCountLike.textContent = res.likes.length;
            cardLike.classList.add("elements__like_act");
          })
          .catch((err) => {
            showError(err);
          });
      }
    });
  }
  _openFoto() {
    this._element
      .querySelector(".elements__photo")
      .addEventListener("click", function () {
        popupPhoto.src = urlValue;
        popupPhoto.alt = nameValue;
        subtitlePhoto.textContent = nameValue;
        openPopup(fullPhoto);
      });
  }
*/
}
//объявить функию для добавления карточки

//export const card = new Card(data, selector);
/*
export function addCard(data) {
  console.log("addCard");
  cardsContainer.prepend(Card(data, selector));
}
*/
/*
const cardCountLike = cardElement.querySelector(".elements__count-like");
const cardLike = cardElement.querySelector(".elements__like");
const cardPhoto = cardElement.querySelector(".elements__photo");
const deleteButton = cardElement.querySelector(".elements__delete");

// cardElement.querySelector(".elements__title").textContent = nameValue;
//cardPhoto.alt = nameValue;
//cardPhoto.src = urlValue;
//cardCountLike.textContent = countLike.length;
//cardElement.dataset.cardOwnerId = ownerId;
//cardElement.dataset.cardId = card_id;
*/

// function createCard(nameValue, urlValue, countLike, ownerId, card_id) {
//   const cardElement = document.querySelector(templateSelector).content.querySelector('.elements__card').cloneNode(true);

//   const cardCountLike = cardElement.querySelector('.elements__count-like');
//   const cardLike = cardElement.querySelector('.elements__like');
//   const cardPhoto = cardElement.querySelector('.elements__photo');
//   const deleteButton = cardElement.querySelector('.elements__delete');

//   cardElement.querySelector('.elements__title').textContent = nameValue;
//   cardPhoto.alt = nameValue;
//   cardPhoto.src = urlValue;
//   cardCountLike.textContent = countLike.length;
//   cardElement.dataset.cardOwnerId =  ownerId;
//   cardElement.dataset.cardId = card_id;

//   if(cardElement.dataset.cardOwnerId  !== profileName.dataset.myId )
//   {deleteButton.style.display = 'none'} else{
//     deleteButton.style.display = 'block';
//     deleteButton.addEventListener('click', function () {
//       openPopup(popupQuestionDelete);
//       cardIdDelete =  cardElement.dataset.cardId;
//     });
//   }

//   if( countLike.some(function(item){
//       return item._id === profileName.dataset.myId})
//     )
//   {cardLike.classList.add('elements__like_act')}

//   cardLike.addEventListener('click', function () {
//     if( cardLike.classList.contains('elements__like_act'))
//       {
//       disLike(cardElement.dataset.cardId)
//       .then((res)=>{
//         cardCountLike.textContent = res.likes.length;
//         cardLike.classList.remove('elements__like_act');
//       })
//       .catch(err => {
//         showError(err)
//       })

//     } else {
//       plusLike(cardElement.dataset.cardId)
//       .then((res)=>{
//         cardCountLike.textContent = res.likes.length;
//         cardLike.classList.add('elements__like_act');
//       })
//       .catch(err => {
//         showError(err)
//       })
//      }
//   });

//   cardPhoto.addEventListener('click', function () {
//     popupPhoto.src = urlValue;
//     popupPhoto.alt = nameValue;
//     subtitlePhoto.textContent = nameValue;
//     openPopup(fullPhoto);
//     });

//   return cardElement;
// };

//объявить функию для добавления карточки
/*
export function addCard(nameValue, urlValue, countLike, ownerId, card_id) {
  cardsContainer.prepend(
    createCard(nameValue, urlValue, countLike, ownerId, card_id)
  );
}
*/
