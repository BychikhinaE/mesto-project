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
} from "./utils/constants.js";

import { renderLoading, showError, showSpinner } from "./utils/utils";
import FormValidator from "./components/FormValidator.js";

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
    user = new UserInfo({
      selectorName: ".profile__name",
      selectorBio: ".profile__bio",
      selectorAvatar: ".profile__avatar",
    });
    user.setUserInfo(userData);
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
        //user.setUserAvatar(res)
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
  document.querySelector("#name").value = userData.name;
  document.querySelector("#bio").value = userData.about;
  profileValidator.toggleButtonState();
  popupProfile.setEventListeners();
  popupProfile.open();
});

export function showQuestion(id, evt) {
  const popupDelete = new PopupDelete({
    selector: ".popup_type_delete",
    handleFormSubmit: () => {
      api
        .deleteCard(id)
        .then(() => {
          popupDelete.close();
          evt.target.closest(".elements__card").remove();
        })
        .catch((err) => {
          showError(err);
        });
    },
  });
  popupDelete.setEventListeners();
  popupDelete.open();
}
