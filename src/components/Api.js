import Card from "./Card.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      //method: "GET",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),

    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    )
    .catch((err) => {
      console.error("Error:", err);
    });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify(this._id),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.error("Error:", err);
      });
  }
}

//editProfile()
//  return fetch(`${this._baseUrl}/users/me`, {
//    method: "PATCH",
//    headers: this._headers,
//})

//export default class Api {
//  constructor({ baseUrl, headers }) {
//    this._baseUrl = baseUrl;
//    this._headers = headers;
//  }
//
//  _checkServerResponse(res) {
//    if (res.ok) {
//      return res.json();
//    } else {
//      return Promise.reject(`Error: ${res.status}`);
//    }
//  }
//
//  getUsersInfo() {
//    return fetch(`${this._baseUrl}/users/me`, {
//      method: "GET",
//      headers: this._headers,
//    }).then(this._checkServerResponse);
//  }
//
//  getCardList() {
//    return fetch(`${this._baseUrl}/cards`, {
//      method: "GET",
//      headers: this._headers,
//    }).then(this._checkServerResponse);
//  }
//
//  getAPIInfo() {
//    return Promise.all([this.getUsersInfo(), this.getCardList()]);
//  }
//
//  editProfile(obj) {
//    return fetch(`${this._baseUrl}/users/me`, {
//      method: "PATCH",
//      headers: this._headers,
//      body: JSON.stringify({
//        name: obj.name,
//        about: obj.about,
//      }),
//    }).then(this._checkServerResponse);
//  }
//
//  addNewCard(obj) {
//    return fetch(`${this._baseUrl}/cards`, {
//      method: "POST",
//      headers: this._headers,
//      body: JSON.stringify({
//        name: obj.name,
//        link: obj.link,
//      }),
//    }).then(this._checkServerResponse);
//  }
//
//  deleteCard(cardId) {
//    return fetch(`${this._baseUrl}/cards/${cardId}`, {
//      method: "DELETE",
//      headers: this._headers,
//    }).then(this._checkServerResponse);
//  }
//
//  addCardLike(cardId) {
//    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//      method: "PUT",
//      headers: this._headers,
//    }).then(this._checkServerResponse);
//  }
//
//  removeCardLike(cardId) {
//    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//      method: "DELETE",
//      headers: this._headers,
//    }).then(this._checkServerResponse);
//  }
//
//  editProfilePhoto(obj) {
//    return fetch(`${this._baseUrl}/users/me/avatar `, {
//      method: "PATCH",
//      headers: this._headers,
//      body: JSON.stringify({
//        avatar: obj.link,
//      }),
//    }).then(this._checkServerResponse);
//  }
//}