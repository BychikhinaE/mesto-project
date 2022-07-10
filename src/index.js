import "./pages/index.css";

import { showError, showSpinner, renderLoading } from "./utils/utils.js";

// import {
//   showSpinner,
//   popupProfile,
//   formProfile,
//   popupAvatar,
//   profileName,
//   profileBio,
//   formAvatar,
//   profileAvatar,
//   buttonSubmitProfile,
//   buttonSubmitAvatar,
//   showError,
// } from "./components/modal.js";

import {
  buttonAdd,
  buttonSubmitAvatar,
  buttonAvatar,
  buttonSubmitProfile,
  buttonEdit,
} from "./utils/constants.js";

//import { enableValidation } from "./components/validate.js";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import UserInfo from "./components/userinfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Card from "./components/card.js";
import FormValidator from "./components/FormValidator.js";
// const nameInput = formProfile.elements.name;
// const jobInput = formProfile.elements.bio;

console.log("Начало");
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    authorization: "ae17cf5f-30f7-49c5-80a6-f47193e26f36",
    "Content-Type": "application/json",
  },
});

//Переменная userId для проверки принадлежности карточки владельцу страницы (кнопки лайк и  удалить)
let user;
let userId = null;

//Объект с настройками для валидации, это первый параметр класса FormValidator
const formConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Вызов валидации
const profileValidator = new FormValidator(formConfig, "#formProfile");
profileValidator.enableValidation();

const avatarValidator = new FormValidator(formConfig, "#formAvatar");
avatarValidator.enableValidation();

const placeValidator = new FormValidator(formConfig, "#formPlace");
placeValidator.enableValidation();

//Загрузить данные пользователя и карточки
Promise.all([api.startLoad(), api.loadCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards);

    // тут установка данных пользователя
    user = new UserInfo({
      selectorName: ".profile__name",
      selectorBio: ".profile__bio",
      selectorAvatar: ".profile__avatar",
    });
    user.getUserInfo(userData);
    userId = user._id;

    // и тут отрисовка карточек
    const cardsList = new Section(
      {
        items: cards.reverse(),
        renderer: (item) => {
          // Создаём экземпляр карточки
          const card = new Card(
            {
              data: item,
              handleCardClick: () => {
                const popupWithImade = new PopupWithImage(".popup_type_photo", item.link, item.name);
                popupWithImade.open()
                popupWithImade.setEventListeners()
              },
            },
            userId,
            "#card-template",
            api
          );
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
// formProfile.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   renderLoading(true, buttonSubmitProfile);
//   const { name, bio } = evt.currentTarget.elements;
//   editProfile({
//     name: name.value,
//     about: bio.value,
//   })
//     .then((res) => {
//       profileName.textContent = res.name;
//       profileBio.textContent = res.about;
//       closePopup(popupProfile);
//     })
//     .catch((err) => {
//       showError(err);
//     })
//     .finally(() => {
//       renderLoading(false, buttonSubmitProfile);
//     });
// });

//Добавляем отслеживание отправки формы с изменением ФОТО в профиле
const popupAvatar = new PopupWithForm({
  selector: ".popup_type_avatar",
  handleFormSubmit: (obj) => {
    console.log(obj, obj.avatar);
    renderLoading(true, buttonSubmitAvatar);
    user
      .setUserAvatar(obj.avatar, api)
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
  console.log("clickAvatar");
  popupAvatar.open();
});

//Добавляем отслеживание отправки формы с изменением ИНФЫ в профиле
const popupProfile = new PopupWithForm({
  selector: ".popup_type_profile",
  handleFormSubmit: (obj) => {
    console.log(obj);
    renderLoading(true, buttonSubmitProfile);
    user
      .setUserInfo(obj.name, obj.bio, api)
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
  api
    .startLoad()
    .then((userData) => {
      document.querySelector("#name").value = userData.name;
      document.querySelector("#bio").value = userData.about;
    })
    .then(() => {
      profileValidator.toggleButtonState();
      popupProfile.setEventListeners();
      popupProfile.open();
    })
    .catch((err) => {
      showError(err);
    });
});

//Добавляем новую карточку из формы
const popupPlace = new PopupWithForm({
  selector: ".popup_type_place",
  handleFormSubmit: (obj) => {
    console.log(obj, obj.namePlace, obj.link);
    showSpinner(true);
    api
      .postNewCard({
        name: obj.namePlace,
        link: obj.link,
      })
      .then((item) => {
        const card = new Card(
          {
            data: item,
            handleCardClick: () => {
              const popupWithImade = new PopupWithImage(
                ".popup_type_photo",
                item.link,
                item.name
              );
              popupWithImade.open();
              popupWithImade.setEventListeners();
            },
          },
          userId,
          "#card-template",
          api
        );
        // Создаём карточку и возвращаем её наружу
        const cardElement = card.generate();
        // Добавляем в DOM
        document.querySelector(".elements").prepend(cardElement);
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
  console.log("click");
  popupPlace.open();
});

//Слушаем ответ на вопрос об удалении карточки
// buttonQuestionDelete.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   api
//     .deleteCard(cardIdDelete.cardId)
//     .then(() => {
//       closePopup(popupQuestionDelete);
//       cardIdDelete.cardElement.closest(".elements__card").remove();
//     })
//     .catch((err) => {
//       showError(err);
//     });
// });
