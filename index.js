const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__edit');
const buttonAdd = content.querySelector('.profile__add');
const formProfile = document.querySelector('.popup_type_profile');
const nameInput = formProfile.querySelector('#name');
const jobInput = formProfile.querySelector('#bio');
const profileName = content.querySelector('.profile__name');
const profileBio = content.querySelector('.profile__bio');
const formElement = document.querySelector('.popup_type_place');
const namePlace = formElement.querySelector('#namePlace');
const link = formElement.querySelector('#link');
const cardsContainer = content.querySelector('.elements');
const fullPhoto = document.querySelector('.popup_type_photo');
const popupPhoto = fullPhoto.querySelector('.popup__photo');
const subtitlePhoto = fullPhoto.querySelector('.popup__subtitle');

//объявить функию Открыть попап
  function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
  };

//объявить функию для создания карточки
function createCard(nameValue, urlValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardLike = cardElement.querySelector('.elements__like');
  const cardPhoto = cardElement.querySelector('.elements__photo');
  const deleteButton = cardElement.querySelector('.elements__delete');

  cardElement.querySelector('.elements__title').textContent = nameValue;
  cardPhoto.alt = nameValue;
  cardPhoto.src = urlValue;

  cardLike.addEventListener('click', function () {
    cardLike.classList.toggle('elements__like_act');
  });

  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  cardPhoto.addEventListener('click', function () {
    popupPhoto.src = urlValue;
    popupPhoto.alt = nameValue;
    subtitlePhoto.textContent = nameValue;
    openPopup(fullPhoto);
    });

  return cardElement;
};

//объявить функию для добавления карточки
function addCard(nameValue, urlValue) {
  cardsContainer.prepend(createCard(nameValue, urlValue));
}

//объявить функию Закрыть попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

//добавить всем кнопкам функцию Закрыть попап
const buttonCloseAll = document.querySelectorAll('.popup__close')
buttonCloseAll.forEach(function(item){
  item.addEventListener('click', function(){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  })
});

// Обработчик «отправки» формы изменений в профиле
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(formProfile);
};

// Обработчик «отправки» формы карточки
function submitCard(evt) {
  evt.preventDefault();
  addCard(namePlace.value, link.value);
  closePopup(formElement);
  formElement.querySelector('#formPlace').reset();
};

//добавить кнопкe Редакт.профиль функцию Открыть попап
buttonEdit.addEventListener('click', function () {
  openPopup(formProfile);
});

//добавить кнопкe Плюс_карточка функцию Открыть попап
buttonAdd.addEventListener('click', function () {
  openPopup(formElement);
});

// Прикрепляем обработчик к формам:
formProfile.addEventListener('submit', submitProfile);
formElement.addEventListener('submit', submitCard);

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
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
];

initialCards.forEach(function(item){
  addCard(item.name, item.link);
});
