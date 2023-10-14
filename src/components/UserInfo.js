export default class UserInfo {
  //repsonsible for rendering information from the user
  constructor(userNameSelector, aboutSelector, avatarSelector) {
    //object with selectors of two elements
    this._nameElement = document.querySelector(userNameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInput = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = this._nameElement.textContent;
  }
}