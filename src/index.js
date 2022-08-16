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

//Колбэк клика по кнопке лайк для экземпляра Card
function toggleLike(card) {
  if (card.checkMyLike()) {
    api
      .disLike(card._card_id)
      .then((res) => {
        card.changeCountLike(res);
      })
      .catch((err) => {
        showError(err);
      });
  } else {
    api
      .plusLike(card._card_id)
      .then((res) => {
        card.changeCountLike(res);
      })
      .catch((err) => {
        showError(err);
      });
  }
}


//Экземпляр модального с вопросом-подтверждением удаления?
const popupDelete = new PopupDelete({
  selector: ".popup_type_delete",
  handleFormSubmit: (card) => {
    api
      .deleteCard(card._card_id)
      .then(() => {
        popupDelete.close();
        card.deleteCardDOM();
      })
      .catch((err) => {
        showError(err);
      });
  },
});

//Колбэк для экземпляра Card, кликнишь и позовется дальше  handleFormSubmit с 76 строчки
function showQuestion(card) {
  popupDelete.setEventListeners(card);
  popupDelete.open();
}

// Функция создания экземпляра карточки
function createCard(item) {
  // Создаём экземпляр карточки
  const card =  new Card(
    {
      data: item,

      handleCardClick: function ()  {
        popupWithImade.open(this);
      },

      functionLike: function () {
        toggleLike(this);
      },

      functionDelete: function () {
        showQuestion(this);
      },
    },
    user.getUserId(),
    "#card-template"
  )
  const cardElement = card.generate();
  // Добавляем в DOM
  cardsList.addItem(cardElement);
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
          createCard(item);
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
        createCard(item);
        popupPlace.close();
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        showSpinner(false);
      });
  },
  objValid: placeValidator
});
  popupPlace.setEventListeners();
  buttonAdd.addEventListener("click", () => {
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
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitAvatar);
      });
  },
  objValid: avatarValidator
});
  popupAvatar.setEventListeners();
  buttonAvatar.addEventListener("click", () => {
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
  objValid: profileValidator
});
buttonEdit.addEventListener("click", () => {
  const userData = user.getUserInfo();
  userNameInput.value = userData.name;
  userBioInput.value = userData.about;

  profileValidator.toggleButtonState();
  popupProfile.setEventListeners();
  popupProfile.open();
});
