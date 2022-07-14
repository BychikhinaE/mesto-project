export default class UserInfo {
  constructor(
    //объект с селекторами двух элементов:
    //элемента имени пользователя и элемента информации о себе.
    { selectorName, selectorBio, selectorAvatar }
  ) {
    this._selectorName = selectorName;
    this._selectorBio = selectorBio;
    this._selectorAvatar = selectorAvatar;
    this._fieldName = document.querySelector(this._selectorName);
    this._fieldBio = document.querySelector(this._selectorBio);
    this._fieldAvatar = document.querySelector(this._selectorAvatar);
  }

  setUserInfo(userData) {
    this._userData = userData;
    this._fieldName.textContent = this._userData.name;
    this._fieldBio.textContent = this._userData.about;
    this._fieldAvatar.style.backgroundImage = `url(${this._userData.avatar})`;
  }

  getUserInfo() {
    return this._userData;
  }

  getUserId() {
    return this._userData._id;
  }
}
