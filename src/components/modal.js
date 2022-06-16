// работу модальных окон
import {openPopup, closePopup} from '../utils/utils';

const content = document.querySelector('.content');
const spinner = document.querySelector('.spinner');
const buttonEdit = content.querySelector('.profile__edit');
const buttonAvatar = content.querySelector('.profile__avatar-edit');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const formProfile = document.forms.profile;
export const formAvatar = document.forms.avatar;
export const buttonSubmitProfile = formProfile.elements.buttonSubmitProfile;
export const buttonSubmitAvatar = formAvatar.querySelector('.popup__button');
export const profileName = content.querySelector('.profile__name');
export const profileBio = content.querySelector('.profile__bio');
const buttonCloseAll = document.querySelectorAll('.popup__close');
export const profileAvatar = content.querySelector('.profile__avatar')
const popupError = document.querySelector('.popup_type_error');
const textError = popupError.querySelector('.popup__title');


//добавить всем кнопкам функцию Закрыть попап
buttonCloseAll.forEach(function(item){
  item.addEventListener('click', function(){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  })
});


//добавить кнопкe Редакт.профиль функцию Открыть попап
buttonEdit.addEventListener('click', function () {
  openPopup(popupProfile);
});

//добавить кнопкe Редакт. ФОТО профиля функцию Открыть попап
buttonAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
});


//Спиннерзагрузки
export function showSpinner(isLoading){
  if(isLoading){
    spinner.classList.add('spinner_visible');
    content.classList.add('content_hidden')
  } else {
    spinner.classList.remove('spinner_visible');
    content.classList.remove('content_hidden')
  }
}

//Функция для вывода ошибки на экран
export function showError(err) {
  openPopup(popupError);
  textError.textContent = err;
}
