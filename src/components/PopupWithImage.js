import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._image = this._popupElement.querySelector(".modal__previewImage");
    this._caption = this._popupElement.querySelector("#preview-title");

  }
  open(data) {
    super.open();
    if (data) {
      this._image.src = data.link;
      this._image.alt = data.name;
      this._caption.textContent = data.name;
    }
  }

}