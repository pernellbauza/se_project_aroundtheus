import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popForm = this._popupElement.querySelector(".modal__form");
        this._deletePopup = document.querySelector("#modal-confirm-delete");
        this._deletePopupCloseBtn = this._popupElement.querySelector("#modal-button-close-confirm-delete");
        this._deletePopupSubmit = this._popupElement.querySelector("#modal-button-confirm-delete");
        this._deletePopUpSubmitText = this._deletePopupSubmit.textContent
    }
        setEventListeners(){
            super.setEventListeners();
            this._popForm.addEventListener("submit", (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(evt);
            })
        }
        setDeleting = (isDeleting, deletingText = "Deleting...") => {
            if (isDeleting) {
                this._deletePopupSubmit.textContent = deletingText;
              } else {
                this._deletePopupSubmit.textContent = this._deletePopUpSubmitText;
              }
            };

            setSubmitCall(callback){
                this._handleFormSubmit = callback;
            }
    }