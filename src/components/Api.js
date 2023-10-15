export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
_checkResponse(res){
  if (res.ok) {
    return res.json();
  }else{
    return Promise.reject(`'Error:' ${res.status}`)
  }
}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      }).then(this._checkResponse);
    }

 getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      }).then(this._checkResponse);
    }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({ name, link }),
      headers: this._headers,
    }).then(this._checkResponse);
  }


  updateEditProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
      headers: this._headers,
      }).then(this._checkResponse);
    }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      }).then(this._checkResponse);
    }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      }).then(this._checkResponse);
    }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      }).then(this._checkResponse);
    }

  updateAvatar(updatedAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: updatedAvatar }),
      headers: this._headers,
      }).then(this._checkResponse);
    }
}