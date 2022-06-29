export default class UserInfo {
  constructor(
    //объект с селекторами двух элементов:
    //элемента имени пользователя и элемента информации о себе.
    { selectorName, selectorBio, selectorAvatar }
  ) {
    this._selectorName = selectorName;
    this._selectorBio = selectorBio;
    this._selectorAvatar = selectorAvatar;
    this._id = null;
  }

  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  //Данные для этого метода нужно получать от методов класса Api — подумайте над тем,
  //как внедрить метод класса Api в getUserInfo. Когда данные
  //пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
  getUserInfo(userData) {
    document.querySelector(this._selectorName).textContent = userData.name;
    document.querySelector(this._selectorBio).textContent = userData.about;
    document.querySelector(
      this._selectorAvatar
    ).style.backgroundImage = `url(${userData.avatar})`;
    this._id = userData._id;
    //для попап редактировать профиль заполняем поля
    document.forms.profile.elements.name.value = userData.name;
    document.forms.profile.elements.bio.value = userData.about;
  }
  //публичный метод setUserInfo, который принимает новые данные пользователя,
  //отправляет их на сервер и добавляет их на страницу.
  setUserInfo({ name, bio }, api) {
    api
      .editProfile({
        name: name.value,
        about: bio.value,
      })
      .then((res) => {
        document.querySelector(this._selectorName).textContent = res.name;
        document.querySelector(this._selectorBio).textContent = res.about;
      });
  }

  setUserAvatar({ avatar }, api) {
    api
      .editAvatar({
        avatar: avatar.value,
      })
      .then((res) => {
        document.querySelector(
          this._selectorAvatar
        ).style.backgroundImage = `url(${res.avatar})`;
      });
  }
}
