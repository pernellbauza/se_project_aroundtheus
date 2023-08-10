const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
  },
]


const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Wrapppers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#previewImageModal");
const modalImage = document.querySelector("#modalImage");
const modalText = document.querySelector("#modalText");
// Buttons and Other DOM nodes

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const closePreviewImageButton = document.querySelector("#previewCloseBtn");

//Form Data
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);

  closeModal(addCardModal);
  addCardFormElement.reset();
}

function getCardElement(data) {
  // clone the template element with all its content and store it in a cardElement variable
  // access the card title and image and store them in variables
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  //find the delete button
  //add the event listener to the delete button
  //cardElement.remove();
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // add click listener to the cardImage element
  //open modal with **previewImageModal - add it into the html

  //function openModal(modal) {
  //modal.classList.add("modal_opened");
  //

  cardImage.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalText.textContent = data.name;
    openModal(previewImageModal);
  });

  //  previewCloseButton.addEventListener("click", closeModal);

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

//profileModalCloseButton.addEventListener("click", () =>
  //closeModal(editProfileModal)
//);

// Add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
//addCardModalCloseButton.addEventListener("click", () =>
  //closeModal(addCardModal)
//);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//Form listeners

addCardFormElement.addEventListener("submit", handleCardAddSubmit);

//closePreviewImageButton.addEventListener("click", () =>
  //closeModal(previewImageModal)
//);

const modals = document.querySelectorAll(".modal");
let currentlyOpenModal = null;

// close the popup when esc is pressed
function closeByEscape(evt) {
  //console.log("Escape key pressed");
  if (evt.key === "Escape" && currentlyOpenModal) {
        closeModal(currentlyOpenModal);
      }
    };

// open popup and add esc event listener
function openModal(modal) {
  modal.classList.add("modal_opened");
  currentlyOpenModal = modal;
  document.addEventListener("keydown", closeByEscape);
}

// close popup and remove esc event listener
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  currentlyOpenModal = null;
  document.removeEventListener("keydown", closeByEscape);
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.currentTarget);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(evt.currentTarget);
    }
  });
});

