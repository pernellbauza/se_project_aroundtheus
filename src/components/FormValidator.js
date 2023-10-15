export default class FormValidator {

  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl, errorMessageElm) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElm.textContent = inputEl.validationMessage;
    errorMessageElm.classList.add(this._errorClass);
  }

  _hideInputError(formEl, inputEl) {
    const errorMessageElm = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageElm.textContent = " ";
    errorMessageElm.classList.remove(this._errorClass);
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(
        inputEl,
        formEl.querySelector(`#${inputEl.id}-error`)
      );
    } else {
      this._hideInputError(formEl, inputEl);
    }
  }

  _checkFormValidity = () => {
    return this._inputElements.every(
      (input) => input.validity.valid
    );
  };

  resetValidation() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(this._form, inputElement)
    });
  }

  toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }
} 