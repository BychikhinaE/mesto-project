import "./pages/index.css";

import { closePopup, renderLoading } from "./utils/utils.js";

import {
  showSpinner,
  popupProfile,
  formProfile,
  popupAvatar,
  profileName,
  profileBio,
  formAvatar,
  profileAvatar,
  buttonSubmitProfile,
  buttonSubmitAvatar,
  showError,
} from "./components/modal.js";

import {
  popupPlace,
  //addCard,
  formPlace,
  buttonCreatePlace,
  buttonQuestionDelete,
  popupQuestionDelete,
  cardIdDelete,
  Card,
  //selector,
  //cardsContainer,
} from "./components/card.js";

import { enableValidation } from "./components/validate.js";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import UserInfo from "./components/userinfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.bio;

console.log("Начало");
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    authorization: "ae17cf5f-30f7-49c5-80a6-f47193e26f36",
    "Content-Type": "application/json",
  },
});

let userId = null;
//Загрузить данные пользователя и карточки
Promise.all([api.startLoad(), api.loadCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards);
    // тут установка данных пользователя
    // profileName.textContent = userData.name;
    // profileBio.textContent = userData.about;
    // nameInput.value = userData.name;
    // jobInput.value = userData.about;
    // profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    // //В атрибуте сохраняем id , с которым далее будем сравнить авторство карточек
    // profileName.dataset.myId = userData._id;

    const user = new UserInfo({
      selectorName: ".profile__name",
      selectorBio: ".profile__bio",
      selectorAvatar: ".profile__avatar",
    });
    user.getUserInfo(userData);
    userId = user._id;
    // и тут отрисовка карточек
    //   cards.reverse().forEach((card) => {
    //     const classaddCard = new Card(card, selector);

    //     const cardElement = classaddCard.generate();

    //     cardsContainer.prepend(cardElement);
    //     console.log("cardElement");
    //   });
    // })
    const cardsList = new Section(
      {
        items: cards.reverse(),
        renderer: (item) => {
          // Создаём экземпляр карточки
          const card = new Card(
            {
              data: item,
              handleCardClick: () => {
                console.log(item.link, item.name);
                const popupWithImade = new PopupWithImage(".popup_type_photo");
                //НЕ РАБОТЫВАВЫЕТ (((((((
                popupWithImade.open(item.link, item.name);
              },
            },
            userId,
            "#card-template"
          );
          // Создаём карточку и возвращаем её наружу
          const cardElement = card.generate();
          // Добавляем в DOM
          cardsList.addItem(cardElement);
          console.log("cardElement");
        },
      },
      ".elements"
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    showError(err);
  });

//Вызов валидации
// enableValidation({
//  // formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

//Добавляем отслеживание отправки формы с информацией в профиле
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitProfile);
  const { name, bio } = evt.currentTarget.elements;
  editProfile({
    name: name.value,
    about: bio.value,
  })
    .then((res) => {
      profileName.textContent = res.name;
      profileBio.textContent = res.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitProfile);
    });
});

//Добавляем отслеживание отправки формы с изменением фото в профиле
formAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitAvatar);
  const { avatar } = evt.currentTarget.elements;
  editAvatar({
    avatar: avatar.value,
  })
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatar);
      formAvatar.reset();
      buttonSubmitAvatar.classList.add("popup__button_disabled");
      buttonSubmitAvatar.disabled = true;
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitAvatar);
    });
});

//Добавляем новую карточку из формы
formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  showSpinner(true);
  const { namePlace, link } = evt.currentTarget.elements;
  api
    .postNewCard({
      name: namePlace.value,
      link: link.value,
    })
    // .then((card) => {
    //   addCard(card.name, card.link, card.likes, card.owner._id, card._id);
    //   closePopup(popupPlace);
    //   formPlace.reset();
    //   buttonCreatePlace.classList.add("popup__button_disabled");
    //   buttonCreatePlace.disabled = true;
    // })
    .then((item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            const popupWithImade = new PopupWithImage(".popup_type_photo");
            popupWithImade.open(card._url, card._name);
          },
        },
        userId,
        "#card-template"
      );
      // Создаём карточку и возвращаем её наружу
      const cardElement = card.generate();
      // Добавляем в DOM
      document.querySelector(".elements").append(cardElement);
      closePopup(popupPlace);
      formPlace.reset();
      //buttonCreatePlace.classList.add('popup__button_disabled');
      //buttonCreatePlace.disabled = true;
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      showSpinner(false);
    });
});

//Слушаем ответ на вопрос об удалении карточки
buttonQuestionDelete.addEventListener("click", function (evt) {
  evt.preventDefault();
  deleteCard(cardIdDelete)
    .then(() => {
      closePopup(popupQuestionDelete);
      document.querySelector(`[data-card-id="${cardIdDelete}"]`).remove();
    })
    .catch((err) => {
      showError(err);
    });
});
