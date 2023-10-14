import {settings} from "../utils/constants.js"

export const formList = [...document.querySelectorAll(settings.formSelector)]
export const modals = [...document.querySelectorAll(".modal")]; //get all modal containers

/*EDIT PROFILE*/
export const profileButtonEdit = document.querySelector("#profile-button-edit"); //profile edit button
export const profileEditModal = document.querySelector("#modal-edit-profile"); //profile edit modal
export const profileButtonClose = profileEditModal.querySelector( //profile edit modal close button
  "#modal-edit-button-close"
);
export const profileName = document.querySelector(".profile__name"); //profile name element
export const profileBio = document.querySelector(".profile__subtitle"); // profile bio element
export const profileCurrentName = document.querySelector("#edit-name"); // profile current name input
export const profileCurrentBio = document.querySelector("#edit-bio"); // profile current bio input
export const profileFormEdit = profileEditModal.querySelector("#modal-form-edit"); // profile edit form
export const editSubmitButton = document.querySelector("#modal-button-save");

/*ADD PROFILE */
export const profileButtonAdd = document.querySelector("#profile-button-add");// profile add button
export const profileAddModal = document.querySelector("#modal-add-profile"); // profile add modal
export const profileFormAdd = profileAddModal.querySelector("#add-modal-form"); //profile add form
export const profileButtonCloseAdd = profileAddModal.querySelector( // profile add modal close button
  "#modal-button-close-add"
);
export const addSubmitButton = document.querySelector("#modal-button-create");

export const profileAddImageTitle = profileFormAdd.querySelector("#add-title"); //profile add image title
export const profileAddImageLink = profileFormAdd.querySelector("#add-imageURL"); // prtofile add image link

/*PREVIEW IMAGE*/
export const previewImageModal = document.querySelector("#modal-previewImage"); //preview image modal
export const previewImage = document.querySelector(".modal__previewImage"); //get preview image element
export const previewImageTitle = document.querySelector("#preview-title"); //get preview image title element
export const previewImageModalClose = previewImageModal.querySelector( //preview image modal close button
  "#modal-button-close-preview"
);

/*CONFIRMATION MODAL*/
export const confirmModal = document.querySelector("#modal-confirm-delete");
export const confirmModalClose = confirmModal.querySelector("#modal-button-confirm-delete");
export const confirmForm = confirmModal.querySelector("#modal-delete-form");
export const confirmSubmitButton = confirmModal.querySelector("#modal-button-confirm-delete");

/*AVATAR*/
export const avatarModal = document.querySelector("#modal-avatar");
export const avatarImgButton = document.querySelector(".profile__avatar-button");
export const avatarImage = document.querySelector("#profile-avatar");
export const avatarModalClose = avatarModal.querySelector("#modal-button-close-avatar");
export const avatarForm = document.querySelector("#avatar-modal-form");
export const avatarAddImageLink = avatarForm.querySelector("#avatar-imageURL");
export const avatarSubmitButton = avatarForm.querySelector("#modal-button-avatar");

/*CARD*/
export const cardsContent = document.querySelector(".cards__content"); // card content container
export const cardTemplate = document  // cloned card template
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);