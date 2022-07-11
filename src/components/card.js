import { showError } from "../utils/utils.js";
import { showQuestion } from "../index.js";

export default class Card {
  constructor({ data, handleCardClick }, checkId, selector, api) {
    this._name = data.name;
    this._url = data.link;
    this._countLike = data.likes;
    this._ownerId = data.owner._id;
    this._card_id = data._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._checkId = checkId;
    this._api = api;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }
  //публичный метод, который возвращает полностью работоспособный
  //и наполненный данными элемент карточки
  generate() {
    // Запишем разметку в приватное поле _element
    this._element = this._getElement();

    // Добавим данные
    this._element.querySelector(".elements__title").textContent = this._name;
    this._cardPhoto = this._element.querySelector(".elements__photo");
    this._cardPhoto.alt = this._name;
    this._cardPhoto.src = this._url;
    this._cardCountLike = this._element.querySelector(".elements__count-like");
    this._cardCountLike.textContent = this._countLike.length;

    this._cardLike = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(".elements__delete");
    //добавить активный лайк, если карточка наша и мы ее лайкали
    if (
      this._countLike.some((item) => {
        return item._id === this._checkId;
      })
    ) {
      this._cardLike.classList.add("elements__like_act");
    }
    //добавить корзину, если карточка наша
    if (this._ownerId !== this._checkId) {
      this._deleteButton.style.display = "none";
    } else {
      this._deleteButton.style.display = "block";
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener("click", (evt) => {
      this._checkDelete(evt);
    });

    this._cardLike.addEventListener("click", () => {
      this._like();
    });

    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick();
    });
  };

  _checkDelete(evt) {
    showQuestion(this._card_id, evt);
  }

  _like() {
    if (this._cardLike.classList.contains("elements__like_act")) {
      this._api
        .disLike(this._card_id)
        .then((res) => {
          this._cardCountLike.textContent = res.likes.length;
          this._cardLike.classList.remove("elements__like_act");
        })
        .catch((err) => {
          showError(err);
        });
    } else {
      this._api
        .plusLike(this._card_id)
        .then((res) => {
          this._cardCountLike.textContent = res.likes.length;
          this._cardLike.classList.add("elements__like_act");
        })
        .catch((err) => {
          showError(err);
        });
    }
  }
}
