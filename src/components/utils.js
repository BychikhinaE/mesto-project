// утилитарные функции, которые используются в работе сразу нескольких других функций

function closeClickListener(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//объявить функию Открыть попап
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closeClickListener);
  document.addEventListener('keydown', closeByEscape)
};

 //объявить функию Закрыть попап
 export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closeClickListener);
  document.removeEventListener('keydown', closeByEscape)
};
