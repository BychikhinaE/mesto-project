export default class UserInfo {
  constructor(
    //объект с селекторами двух элементов:
    //элемента имени пользователя и элемента информации о себе.
    { selectorName, selectorBio, selectorAvatar }
  ) {
    this._selectorName = selectorName;
    this._selectorBio = selectorBio;
    this._selectorAvatar = selectorAvatar;
    this.fieldName = document.querySelector(this._selectorName);
    this.fieldBio = document.querySelector(this._selectorBio);
    this.fieldAvatar = document.querySelector(this._selectorAvatar);
  }

  setUserInfo(userData) {
    this._userData = userData;
    this.fieldName.textContent = this._userData.name;
    this.fieldBio.textContent = this._userData.about;
    this.fieldAvatar.style.backgroundImage = `url(${this._userData.avatar})`;
  }

  getUserInfo() {
    return this._userData;
  }

  getUserId() {
    return this._userData._id;
  }
}
