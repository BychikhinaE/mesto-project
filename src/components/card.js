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
//const cardTemplate = document.querySelector("#card-template").content;
export let cardIdDelete = 0;

export const selector = ".elements__card";
//добавить кнопкe Плюс_карточка функцию Открыть попап
buttonAdd.addEventListener("click", function () {
  openPopup(popupPlace);
});

//Функция создания новой карточки
export class Card {
  constructor({data,
    handleCardClick},
    checkId,
    selector) {
    this._name = data.name;
    this._url = data.link;
    this._countLike = data.likes;
    this._ownerId = data.owner._id;
    this._card_id = data._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._checkId = checkId;
  }

  _getElement() {
    console.log("_getElement");
    const cardElement = document.querySelector(this._selector).content.querySelector(".elements__card").cloneNode(true);

    return cardElement;
  }
//публичный метод, который возвращает полностью работоспособный
//и наполненный данными элемент карточки
  generate() {
    console.log("generate");
    // Запишем разметку в приватное поле _element
    this._element = this._getElement();
    this._setEventListeners();

// Добавим данные
    this._element.querySelector(".elements__title").textContent = this._name;
    const cardPhoto = this._element.querySelector('.elements__photo');
    cardPhoto.alt = this._name;
    cardPhoto.src = this._url;
    const cardCountLike = this._element.querySelector('.elements__count-like');
    cardCountLike.textContent = this._countLike.length;
    console.log(this._element);

    const cardLike = this._element.querySelector('.elements__like');
    const deleteButton = this._element.querySelector('.elements__delete');
//добавить активный лайк, если карточка наша и мы ее лайкали
    if( this._countLike.some((item)=>{return item._id === this._checkId})
      ) {cardLike.classList.add('elements__like_act')}
//добавить корзину, если карточка наша
    if(this._ownerId  !== this._checkId )
    {deleteButton.style.display = 'none'} else {
      deleteButton.style.display = 'block'
    }


    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__delete').addEventListener('click', () =>{
      this._checkDelete()
    });

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._like(api)
    });

    this._element.querySelector('.elements__photo').addEventListener('click', () =>{
      this._handleCardClick();
    });
  }

  _checkDelete () {
    openPopup(popupQuestionDelete);
    cardIdDelete =  this._card_id;
  }

  _like(api){
    if( cardLike.classList.contains('elements__like_act'))
    {
    api.disLike(this._element.dataset.cardId)
    .then((res)=>{
      cardCountLike.textContent = res.likes.length;
      cardLike.classList.remove('elements__like_act');
    })
    .catch(err => {
      showError(err)
    })

  } else {
    api.plusLike(this._element.dataset.cardId)
    .then((res)=>{
      cardCountLike.textContent = res.likes.length;
      cardLike.classList.add('elements__like_act');
    })
    .catch(err => {
      showError(err)
    })
    }
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
