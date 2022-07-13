import "./pages/index.css";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/Userinfo.js";
import Card from "./components/card.js";
import PopupDelete from "./components/PopupDelete.js";
import {
  buttonAdd,
  buttonSubmitAvatar,
  buttonAvatar,
  buttonSubmitProfile,
  buttonEdit,
  userNameInput,
  userBioInput,
} from "./utils/constants.js";

import { renderLoading, showError, showSpinner } from "./utils/utils";
import FormValidator from "./components/FormValidator.js";
import { formConfig } from "./utils/formConfig.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    authorization: "ae17cf5f-30f7-49c5-80a6-f47193e26f36",
    "Content-Type": "application/json",
  },
});
//Сюда запишем экземпляр класса UserInfo и Section соответственно
let user;
let cardsList;

//Вызов валидации
const profileValidator = new FormValidator(formConfig, "#formProfile");
profileValidator.enableValidation();

const avatarValidator = new FormValidator(formConfig, "#formAvatar");
avatarValidator.enableValidation();

const placeValidator = new FormValidator(formConfig, "#formPlace");
placeValidator.enableValidation();

//Экземпляр модального с полноразмерным фото, его метод передадим в колбэк экземпляра Card
const popupWithImade = new PopupWithImage(".popup_type_photo");
//добавляем слушатель клика иконке закрытия попапа с фоткой один раз и на всю жизнь
popupWithImade.setEventListeners();

//НЕкоторый функционал
//Колбэк клика по кнопке лайк для экземпляра Card
function toggleLike(cardEl, evt) {
  if (evt.target.classList.contains("elements__like_act")) {
    api
      .disLike(cardEl._id)
      .then((res) => {
        evt.target
          .closest(".elements__card")
          .querySelector(".elements__count-like").textContent =
          res.likes.length;
        evt.target.classList.toggle("elements__like_act");
        //  card.changeCountLike(res);
      })
      .catch((err) => {
        showError(err);
      });
  } else {
    api
      .plusLike(cardEl._id)
      .then((res) => {
        evt.target
          .closest(".elements__card")
          .querySelector(".elements__count-like").textContent =
          res.likes.length;
        evt.target.classList.toggle("elements__like_act");
        //  card.changeCountLike(res);
      })
      .catch((err) => {
        showError(err);
      });
  }
}

//Экземпляр модального с вопросом-подтверждением удаления?
const popupDelete = new PopupDelete({
  selector: ".popup_type_delete",
  handleFormSubmit: (card, evt) => {
    api
      .deleteCard(card._id)
      .then(() => {
        popupDelete.close();
        evt.target.closest(".elements__card").remove();
        //card.deleteCardDOM(evt);
      })
      .catch((err) => {
        showError(err);
      });
  },
});

//Колбэк для экземпляра Card, кликнишь и позовется дальше  handleFormSubmit с 76 строчки
function showQuestion(card, evt) {
  popupDelete.setEventListeners(card, evt);
  popupDelete.open();
}

// Функция создания экземпляра карточки
function createCard(item) {
  // Создаём экземпляр карточки
  return new Card(
    {
      data: item,

      handleCardClick: (evt) => {
        popupWithImade.open(evt.target);
      },

      functionLike: function () {
        toggleLike(this);
      },

      functionDelete: function (evt) {
        showQuestion(this, evt);
      },
    },
    user.getUserId(),
    "#card-template"
  );
}

//Загрузить данные пользователя и карточки, создаем экземпляры user = new UserInfo и cardsList = new Section
Promise.all([api.startLoad(), api.loadCards()])
  .then(([userData, cards]) => {
    user = new UserInfo({
      selectorName: ".profile__name",
      selectorBio: ".profile__bio",
      selectorAvatar: ".profile__avatar",
    });
    user.setUserInfo(userData);

    // и тут отрисовка карточек
    cardsList = new Section(
      {
        items: cards.reverse(),
        renderer: (item) => {
          const card = createCard(item);
          // Создаём карточку и возвращаем её наружу
          const cardElement = card.generate();
          // Добавляем в DOM
          cardsList.addItem(cardElement);
        },
      },
      ".elements"
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    showError(err);
  });

//Добавляем новую карточку из формы
const popupPlace = new PopupWithForm({
  selector: ".popup_type_place",
  handleFormSubmit: (obj) => {
    showSpinner(true);
    api
      .postNewCard({
        name: obj.namePlace,
        link: obj.link,
      })
      .then((item) => {
        const card = createCard(item);
        // Создаём карточку и возвращаем её наружу
        const cardElement = card.generate();
        // Добавляем в DOM
        cardsList.addItem(cardElement);

        popupPlace.close();
        placeValidator.toggleButtonState();
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        showSpinner(false);
      });
  },
});
popupPlace.setEventListeners();
buttonAdd.addEventListener("click", function () {
  popupPlace.open();
});

//Добавляем отслеживание отправки формы с изменением фото в профиле
const popupAvatar = new PopupWithForm({
  selector: ".popup_type_avatar",
  handleFormSubmit: (obj) => {
    renderLoading(true, buttonSubmitAvatar);
    api
      .editAvatar({
        avatar: obj.avatar,
      })
      .then((res) => {
        user.setUserInfo(res);
      })
      .then(() => {
        popupAvatar.close();
        avatarValidator.toggleButtonState();
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitAvatar);
      });
  },
});
popupAvatar.setEventListeners();
buttonAvatar.addEventListener("click", function () {
  popupAvatar.open();
});

//Добавляем отслеживание отправки формы с изменением в профиле
const popupProfile = new PopupWithForm({
  selector: ".popup_type_profile",
  handleFormSubmit: (obj) => {
    renderLoading(true, buttonSubmitProfile);
    api
      .editProfile({
        name: obj.name,
        about: obj.bio,
      })
      .then((res) => {
        user.setUserInfo(res);
      })
      .then(() => {
        popupProfile.close();
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitProfile);
      });
  },
});
buttonEdit.addEventListener("click", function () {
  const userData = user.getUserInfo();
  userNameInput.value = userData.name;
  userBioInput.value = userData.about;
  profileValidator.toggleButtonState();
  popupProfile.setEventListeners();
  popupProfile.open();
});
