import {
  openModal,
  closeModal,
  closeByEscape,
} from "../utils/utils.js";

const previewImageModal = document.querySelector("#preview-image-modal");

const imgEL = document.querySelector(".modal__image");

const previewText = document.querySelector(".modal__preview-title");

const cardElement = document.querySelector(".card__image");

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //this._cardElement
    //.querySelector(".card__image")
    ////.addEventListener("click", this._handlePreviewPicture);

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewPicture() {
    imgEL.src = this._link;
    imgEL.alt = this._name;
    if (previewText) {
      previewText.textContent = this._name;
    }

    openModal(previewImageModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").innerText = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

//class Card {
//  constructor(data, cardTemplate) {
//    this._data = data;
//    this._cardElement = cardTemplate.content.cloneNode(true);
//    this._cardImage = this._cardElement.querySelector(".card__image");
//    this._cardTitle = this._cardElement.querySelector(".card__title");
//    this._likeButton = this._cardElement.querySelector(".card__like-button");
//    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
//
//    this._setupListeners();
//    this._updateCardData();
//  }
//
//  _setupListeners() {
//    this._deleteButton.addEventListener("click", () => {
//      this._cardElement.remove();
//    });
//
//    this._cardImage.addEventListener("click", () => {
//      modalImage.src = this._data.link;
//      modalImage.alt = this._data.name;
//      modalText.textContent = this._data.name;
//      openModal(previewImageModal);
//    });
//
//    this._likeButton.addEventListener("click", () => {
//      this._likeButton.classList.toggle("card__like-button_active");
//    });
//  }
//
//  _updateCardData() {
//    this._cardImage.src = this._data.link;
//    this._cardImage.alt = this._data.name;
//    this._cardTitle.textContent = this._data.name;
//  }
//
//  getElement() {
//    return this._cardElement;
//  }
//}

export default Card;