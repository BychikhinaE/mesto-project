// работу модальных окон
import {openPopup, closePopup} from './utils';

  const content = document.querySelector('.content');
  const buttonEdit = content.querySelector('.profile__edit');
  export const formProfile = document.querySelector('.popup_type_profile');
  const nameInput = formProfile.querySelector('#name');
  const jobInput = formProfile.querySelector('#bio');
  const profileName = content.querySelector('.profile__name');
  const profileBio = content.querySelector('.profile__bio');
  const buttonCloseAll = document.querySelectorAll('.popup__close');

  //добавить всем кнопкам функцию Закрыть попап
  buttonCloseAll.forEach(function(item){
    item.addEventListener('click', function(){
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup)
    })
  });

  // Обработчик «отправки» формы изменений в профиле
  export function submitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    closePopup(formProfile);
  };

  //добавить кнопкe Редакт.профиль функцию Открыть попап
  buttonEdit.addEventListener('click', function () {
    openPopup(formProfile);
  });



