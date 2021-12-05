const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const formElement = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup-profile");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupSubmitButton = popup.querySelector(".popup__submit-button");
const nameUser = document.querySelector(".profile__name");
const nameInfo = document.querySelector(".profile__name-info");
const formName = popup.querySelector(".popup__input_type_name");
const formInfo = popup.querySelector(".popup__input_type_info");

const cardsContainerEl = document.querySelector(".cards");
const templateEl = document.querySelector(".template");
const popupAdd = document.querySelector(".popup-add");
const buttonPlusCard = document.querySelector(".profile__add-button");
const popupAddCloseButton = popupAdd.querySelector(".popup__close-button");
const buttonAddCard = popupAdd.querySelector(".popup__submit-button");
const cardName = popupAdd.querySelector(".popup__input_type_name");
const cardSrc = popupAdd.querySelector(".popup__input_type_info");

const popupZoom = document.querySelector(".popup-zoom");
const buttonClosePopupZoom = popupZoom.querySelector(".popup__close-button");

function render() {
  const htmlCards = initialCards.map((item) => {
    return getItem(item);
  });
  cardsContainerEl.append(...htmlCards);
}

function getItem(item) {
  const newCard = templateEl.content.cloneNode(true);

  const cardCommit = newCard.querySelector(".card__commit");
  cardCommit.textContent = item.name;

  const cardPhoto = newCard.querySelector(".card__photo");
  cardPhoto.src = item.link;

  const buttonDeleteCard = newCard.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", handleDelete);

  const buttonCardLike = newCard.querySelector(".card__like");
  buttonCardLike.addEventListener("click", handleCardLike);

  cardPhoto.addEventListener("click", openPopupZoom);

  return newCard;
}

function handleAdd(evt) {
  evt.preventDefault();
  const inputText = cardName.value;
  const inputSrc = cardSrc.value;
  const cardItem = getItem({ name: inputText, link: inputSrc });
  cardsContainerEl.prepend(cardItem);

  cardName.value = "";
  cardSrc.value = "";
  closePopupAdd();
}

function handleDelete(event) {
  const targetCard = event.target;
  const cardItem = targetCard.closest(".card");
  cardItem.remove();
}

function handleCardLike(event) {
  const targetCard = event.target;
  targetCard.classList.toggle("card__like_active");
}

// function openPopupZoom(event) {
//   const targetCard = event.target;
//   const cardItem = targetCard.closest(".card");

//   const figureName = cardItem.querySelector(".card__commit");
//   const name = figureName.textContent;

//   const figurePhoto = cardItem.querySelector(".card__photo");
//   const photoZoom = figurePhoto.src;

//   const popupZoom = document.querySelector(".popup-zoom");
//   popupZoom.classList.add("popup_opened");
//   const popupPhotoZoom = popupZoom.querySelector(".popup__img");
//   popupPhotoZoom.src = photoZoom;
//   const popupSubtitleZoom = popupZoom.querySelector(".popup__subtitle");
//   popupSubtitleZoom.textContent = name;
// }

function closePopupZoom() {
  popupZoom.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  formName.value = nameUser.textContent;
  formInfo.value = nameInfo.textContent;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function savePopup(evt) {
  evt.preventDefault();
  nameUser.textContent = formName.value;
  nameInfo.textContent = formInfo.value;
  closePopup();
}

function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

buttonClosePopupZoom.addEventListener("click", closePopupZoom);
buttonAddCard.addEventListener("click", handleAdd);
buttonPlusCard.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closePopupAdd);
editButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", savePopup);

render();
