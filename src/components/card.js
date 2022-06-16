// функции для работы с карточками проекта Mesto
//объявить функию для создания карточки
import { openPopup } from "../utils/utils";
import { profileName } from "./modal.js";
import { plusLike, disLike } from "./Api";

export const popupPlace = document.querySelector(".popup_type_place");
export const popupQuestionDelete = document.querySelector(".popup_type_delete");
export const buttonQuestionDelete =
  popupQuestionDelete.querySelector("#questionDelete");
export const formPlace = document.forms.formPlace;
export const buttonCreatePlace = formPlace.querySelector(".popup__button");
const cardsContainer = document.querySelector(".elements");
const fullPhoto = document.querySelector(".popup_type_photo");
const popupPhoto = fullPhoto.querySelector(".popup__photo");
const subtitlePhoto = fullPhoto.querySelector(".popup__subtitle");
const buttonAdd = document.querySelector(".profile__add");
//const cardTemplate = document.querySelector('#card-template').content;
export let cardIdDelete = 0;

//добавить кнопкe Плюс_карточка функцию Открыть попап
buttonAdd.addEventListener("click", function () {
  openPopup(popupPlace);
});

//Функция создания новой карточки
//createCard(nameValue, urlValue, countLike, ownerId, card_id)
//           card.name, card.link, card.likes, card.owner._id, card._id
class Card {
  constructor({ data }, selector) {
    this._nameValue = data.name;
    this._urlValue = data.link;
    this._countLike = data.likes;
    this._ownerId = data.owner._id;
    this._card_id = data._id;
    this._selector = selector; //   const cardElement = document.querySelector(templateSelector).content.querySelector('.elements__card').cloneNode(true);

    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    const cardCountLike = cardElement.querySelector(".elements__count-like");
    const cardLike = cardElement.querySelector(".elements__like");
    const cardPhoto = cardElement.querySelector(".elements__photo");
    const deleteButton = cardElement.querySelector(".elements__delete");

    cardElement.querySelector(".elements__title").textContent = nameValue;
    cardPhoto.alt = nameValue;
    cardPhoto.src = urlValue;
    cardCountLike.textContent = countLike.length;
    cardElement.dataset.cardOwnerId = ownerId;
    cardElement.dataset.cardId = card_id;

    if (cardElement.dataset.cardOwnerId !== profileName.dataset.myId) {
      deleteButton.style.display = "none";
    } else {
      deleteButton.style.display = "block";
      deleteButton.addEventListener("click", function () {
        openPopup(popupQuestionDelete);
        cardIdDelete = cardElement.dataset.cardId;
      });
    }

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

    cardPhoto.addEventListener("click", function () {
      popupPhoto.src = urlValue;
      popupPhoto.alt = nameValue;
      subtitlePhoto.textContent = nameValue;
      openPopup(fullPhoto);
    });

    return cardElement;
  }
}

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
export function addCard(nameValue, urlValue, countLike, ownerId, card_id) {
  cardsContainer.prepend(
    createCard(nameValue, urlValue, countLike, ownerId, card_id)
  );
}
