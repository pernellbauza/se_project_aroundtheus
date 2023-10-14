import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popForm = this._popupElement.querySelector(".modal__form");
    this._popSubmitBtn = this._popForm.querySelector(".modal__button_submit");
    this._popInputs = this._popForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._popSubmitBtnText = this._popSubmitBtn.textContent
  }

  _getInputValues() {
    const popInpValues = {};
    this._popInputs.forEach((input) => {
      popInpValues[input.name] = input.value;
    });
    return popInpValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const inputValue = this._getInputValues();
    this.setLoading(true);
    this._handleFormSubmit(inputValue)
    .then(() => {
      this.close();
    })
    .catch((err) => {
      console.error(err);
    })
       .finally(() => this.setLoading(false));
  }

  setEventListeners() {
    super.setEventListeners();
    this._popForm.addEventListener("submit",
    (evt) => this._handleSubmit(evt));
  }

  setInputValues(data) {
    this._popInputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

 close() {
   this._popForm.reset();
   super.close();
  }

  setLoading(isLoading, loadingText="Saving...") {
    if(isLoading) {
     this._popSubmitBtn.textContent = loadingText;
    } else{
      this._popSubmitBtn.textContent = this._popSubmitBtnText;
    }
  }
  setSubmitCall(callback){
    this._handleFormSubmit = callback;
  }
}