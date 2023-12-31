// All imports
import "../pages/index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
//import { openPopup,
//  closePopup,
//  handleClosePopupWithOutsideClick } from "../utils/utils.js";

import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCards,
  cardData,
  cardListSelector,
  settings, } from "../utils/constants.js";

const cardsWrap = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
// const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".card");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
const popups = document.querySelectorAll(".modal");

/* Buttons Elements */
const profileCloseButton = document.querySelector("#profile-close-button");
const cardCloseButton = document.querySelector("#card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
// const closePreviewButton = document.querySelector(
//   "#preview-close-image-button"
// );

/* Form Data const*/
const userInfo = new UserInfo(profileTitle, profileDescription);

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardLinkInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);
const cardSelector = "#card-template";

/*Form Validation*/

const editFormElement = profileEditModal.querySelector(".modal__form");
//const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// New Popupwithform const

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// Create and render card

const renderCard = (cardData) => {
  const newCard = new Card(cardData, cardSelector, handleCardClick);
  cardSection.addItem(newCard.getView());
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListSelector
);

cardSection.renderItems();

//Preview Popup Const

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

/*Event Handlers*/

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
  editProfilePopup.close();
}

function handleAddCardFormSubmit(data) {
  //evt.preventDefault();
  //const name = cardTitleInput.value;
  //const link = cardLinkInput.value;
  //const formData = _getInputValues();
  //renderCard({ name, link }, cardsWrap);
  renderCard({ name: data.title, link: data.link });
  //cardSection.addItem(newCard);

  addCardPopup.close();
  //closePopup(addCardModal);
  //addCardFormElement.reset();
  //submitForm(newCard);
}

function fillProfileForm() {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
}

function openProfileForm() {
  fillProfileForm();
  editProfilePopup.open();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", openProfileForm);
addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopup.open();
});


