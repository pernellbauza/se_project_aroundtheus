// All imports
import * as DOM from "../utils/dom.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import { settings } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import "../pages/index.css";

//
// API
//

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a6b0d3f9-c93a-40a7-bb63-88a6933de23d",
  "Content-Type": "application/json",
  },
});

//const confirmationPopup = new PopupWithConfirmation({ popupSelector: options.deletePopup });
//confirmationPopup.setEventListeners();

//Form Validators
const formValidators = {};
const enableValidation = (settings) => {
  DOM.formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//User Info
const userinfo = new UserInfo(
  ".profile__name",
  ".profile__subtitle",
  "#profile-avatar"
);

//Card
function createCard({ name, link, isLiked, _id }) {
  return new Card(
    { name, link, isLiked, _id },
    "#card-template",
    handleImageClick,
    handleTrashButtonClick,
    handleHeartButton
  ).getCardElement();
}


let section;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, formData]) => {
    section = new Section(
    {
           items: cardData,
           renderer: (item) => {
            const cardElement = createCard(item);
             section.addItem(cardElement);
           },
         },
         ".cards__content"
       );
       section.renderItems();

    userinfo.setUserInfo(formData);
    userinfo.setAvatar(formData.avatar);
  })
  .catch((err) => {
    console.error(err);
  })

//Popups

//PopUpWithImage
const popUpWithImage = new PopUpWithImage("#modal-previewImage");
popUpWithImage.setEventListeners();

//PopUpWithForm
const popUpEditProfile = new PopUpWithForm(
  "#modal-edit-profile",
  ({ name, about }) => {
    return api.updateEditProfile({ name, about }).then((updateEditProfile) => {
      userinfo.setUserInfo(updateEditProfile);
    });
  }
);
popUpEditProfile.setEventListeners();

//PopUpWithForm
const popUpAddItem = new PopUpWithForm("#modal-add-profile", (formData) => {
  return new Promise((resolve, reject) => {
    const name = formData.name;
    const link = formData.link;
    handleAddProfileFormSubmit(name, link)
      .then(() => {
        resolve();
      })
  });
});
popUpAddItem.setEventListeners();

//PopUpWithForm
const popUpAvatar = new PopUpWithForm("#modal-avatar", (formData) => {
  const avatar = formData.avatar;
  return api.updateAvatar(avatar).then((updatedAvatar) => {
    userinfo.setAvatar(updatedAvatar.avatar);
    })
      })
popUpAvatar.setEventListeners();

//PopUpWithConfirmation
const popUpConfirm = new PopUpWithConfirmation("#modal-confirm-delete");
popUpConfirm.setEventListeners();

//Event Handlers
function handleAddProfileFormSubmit(title, link) {
  return api.createCard({ name: title, link})
      .then((card) => {
        section.addItem(createCard(card));
      })
  };

function handleImageClick(data) {
  popUpWithImage.open(data);
}

function handleTrashButtonClick(item) {
  popUpConfirm.setSubmitCall(() => {
    popUpConfirm.setDeleting(true);
    api
      .deleteCard(item.getId())
      .then(() => {
        item.removeCard();
        popUpConfirm.close();
      })
      .catch((err) => {
        console.error("Error:",err)
      })
      .finally (() => popUpConfirm.setDeleting(false));
  });
  popUpConfirm.open();
}

function handleHeartButton(item) {
 const newIsLikedStatus = !item.isLiked;
  if (newIsLikedStatus) {
    api
      .likeCard(item.getId())
      .then((respond) => {
        console.log(respond);
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    api
      .unlikeCard(item.getId())
      .then((respond) => {
        console.log(respond)
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    }
}
enableValidation(settings);

// Add Event Listeners
DOM.profileButtonEdit.addEventListener("click", () => {
  const formData = userinfo.getUserInfo();
  formValidators["modal-edit-form"].resetValidation();
  popUpEditProfile.setInputValues(formData);
  popUpEditProfile.open();
});

DOM.profileButtonAdd.addEventListener("click", () => {
  formValidators["modal-add-form"].resetValidation();
  popUpAddItem.open();
});

DOM.avatarImgButton.addEventListener("click", () => {
  const formData = userinfo.getUserInfo();
  formValidators["modal-avatar-form"].resetValidation();
  popUpAvatar.open();
});