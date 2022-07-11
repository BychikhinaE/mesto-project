export default class UserInfo {
  constructor(
    //объект с селекторами двух элементов:
    //элемента имени пользователя и элемента информации о себе.
    { selectorName, selectorBio, selectorAvatar }
  ) {
    this._selectorName = selectorName;
    this._selectorBio = selectorBio;
    this._selectorAvatar = selectorAvatar;
  }

  setUserInfo(userData) {
    this._userData = userData;
    document.querySelector(this._selectorName).textContent =
      this._userData.name;
    document.querySelector(this._selectorBio).textContent =
      this._userData.about;

    document.querySelector(
      this._selectorAvatar
    ).style.backgroundImage = `url(${this._userData.avatar})`;
  }

  getUserInfo() {
    return this._userData;
  }
}
