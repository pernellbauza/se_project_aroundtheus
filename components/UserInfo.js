export default class UserInfo {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  getUserInfo() {
    return {
      description: this.description.textContent,
      name: this.name.textContent,
    };
  }

  setUserInfo(name, description) {
    this.name.textContent = name;
    this.description.textContent = description;
  }
}