export default class Card {
  constructor({ name, link, _id , isLiked },
    cardSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleHeartButton) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleHeartButton = handleHeartButton;
    //this._setLikeStatus = setLikeStatus;
    //this._cardElement = this._getElement();
  }

  _setEventListeners() {
      this._heartButton.addEventListener("click", () => {
        this._handleHeartButton(this);
      });

      this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () =>
        //console.log("delete card in card.js");
        //this._handleTrashButton(this._id);
        this._handleTrashButtonClick(this));

      this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  removeCard(cardElement){
    this._cardElement.remove();
    console.log("removecard method firing");
    this._cardElement = null;
  }

  setLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
 }

  _renderLikes() {
    if(this.isLiked) {
      this._heartButton.classList.add("card__like-button_active")
    } else {
      this._heartButton.classList.remove("card__like-button_active");
      console.log("like removed from set like status")
    }
   }

 _getElement() {
  return document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);
}
  getCardElement() {
    this._cardElement = this._getElement();
    const cardTitle = this._cardElement.querySelector(".card__title");
    const cardImage = this._cardElement.querySelector(".card__image");
    this._heartButton = this._cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }

  getId(){
    return this._id;
  }
}