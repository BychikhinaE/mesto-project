// утилитарные функции, которые используются в работе сразу нескольких других функций

 //объявить функию Закрыть попап
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

function closeClickListener(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
    evt.target.removeEventListener('click', closeClickListener)
  }
};

//объявить функию Открыть попап
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closeClickListener)
};
