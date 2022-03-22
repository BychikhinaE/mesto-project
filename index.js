const content = document.querySelector(".content");
const buttonEdit = content.querySelector(".profile__edit");
const buttonAdd = content.querySelector(".profile__add");
const formProfile = document.querySelector(".popup_type_profile");
const buttonCloseProfile = formProfile.querySelector(".popup__close_type_profile");
const nameInput = formProfile.querySelector("#name");
const jobInput = formProfile.querySelector("#bio");
const profileName = content.querySelector(".profile__name");
const profileBio = content.querySelector(".profile__bio");
const formElement = document.querySelector(".popup_type_place");
const namePlace = formElement.querySelector("#namePlace");
const link = formElement.querySelector("#link");
const cardsContainer = content.querySelector(".elements");
const buttonClosePlace = formElement.querySelector(".popup__close_type_place");

//объявить функию для добавления карточки
function addCard(nameValue, urlValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const cardLike = cardElement.querySelector(".elements__like");
  cardElement.querySelector(".elements__title").textContent = nameValue;
  cardElement.querySelector(".elements__photo").src = urlValue;
  cardElement.querySelector(".elements__photo").alt = nameValue;

  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__like_act");
  });

  const deleteButton = cardElement.querySelector(".elements__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  cardsContainer.prepend(cardElement);
}

//Открыть - Закрыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  formProfile.classList.add("popup_opened");
});
buttonCloseProfile.addEventListener("click", function () {
  formProfile.classList.remove("popup_opened");
});

//Открыть - Закрыть попап добавления карточки
buttonAdd.addEventListener("click", function () {
  formElement.classList.add("popup_opened");
});

buttonClosePlace.addEventListener("click", function () {
  formElement.classList.remove("popup_opened");
});

// Обработчик «отправки» формы изменений в профиле
function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  formProfile.classList.remove("popup_opened");
}

// Обработчик «отправки» формы карточки
function formSubmitCard(evt) {
  evt.preventDefault();
  addCard(namePlace.value, link.value);
  namePlace.value = "";
  link.value = "";
  formElement.classList.remove("popup_opened");
}

// Прикрепляем обработчик к формам:
formProfile.addEventListener("submit", formSubmitProfile);
formElement.addEventListener("submit", formSubmitCard);

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
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Добавить карточки из массива на страницу
for (let i = 0; i < initialCards.length; i++) {
  nameValue = initialCards[i].name;
  urlValue = initialCards[i].link;
  addCard(nameValue, urlValue);
}

//Просмотр в полноэкранном режиме
const fullPhoto = document.querySelector(".popup_type_photo");
const cardPhotos = content.querySelectorAll(".elements__photo");
const popupPhoto = fullPhoto.querySelector(".popup__photo");
const buttonCloseFullPhoto = fullPhoto.querySelector(
  ".popup__close_type_photo"
);
const subtitlePhoto = fullPhoto.querySelector(".popup__subtitle");

cardPhotos.forEach(function (item) {
  item.addEventListener("click", function () {
    popupPhoto.src = item.src;
    popupPhoto.alt = item.alt;
    subtitlePhoto.textContent = item.alt;
    fullPhoto.classList.add("popup_opened");
  });
});

buttonCloseFullPhoto.addEventListener("click", function () {
  fullPhoto.classList.remove("popup_opened");
});
