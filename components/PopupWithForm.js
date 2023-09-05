import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}