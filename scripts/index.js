import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//---------------------------------------------------------------------------------переменная для дефолтных карточек
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
// -----------------------------------------------------------------------------переменные общие

const editButton = document.querySelector(".profile__edit-button");

const popupOverlays =
  document.querySelectorAll(".popup__overlay"); /* <-- Все оверлеи */

// -----------------------------------------------------------------------------переменные создания template карточек
const cardsContainerEl = document.querySelector(".cards");
const templateEl = document.querySelector(".template");

// -----------------------------------------------------------------------------переменные попапа редактирования профиля
const popupEdit = document.querySelector(".popup-profile");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-button");
const popupEditSubmitButton = popupEdit.querySelector(".popup__submit-button");
const nameUser = document.querySelector(".profile__name");
const nameInfo = document.querySelector(".profile__name-info");
const formName = popupEdit.querySelector(".popup__input_type_name");
const formInfo = popupEdit.querySelector(".popup__input_type_info");

// -----------------------------------------------------------------------------переменные попапа добавления карточки
const popupAdd = document.querySelector(".popup-add");
const buttonPlusCard = document.querySelector(".profile__add-button");
const popupAddCloseButton = popupAdd.querySelector(".popup__close-button");
const buttonAddCard = popupAdd.querySelector(".popup__submit-button");
const cardInputName = popupAdd.querySelector(".popup__input_type_name");
const cardInputSrc = popupAdd.querySelector(".popup__input_type_info");
const popupAddForm = popupAdd.querySelector(".popup__form");

// -----------------------------------------------------------------------------переменные увеличенной фотографии
const popupZoom = document.querySelector(".popup-zoom");
const popupPhotoZoom = popupZoom.querySelector(".popup__img");
const popupSubtitleZoom = popupZoom.querySelector(".popup__subtitle");
const buttonClosePopupZoom = popupZoom.querySelector(".popup__close-button");
// -----------------------------------------------------------------------------для конструктора карточек
const dataValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//-------------------------------------------------------------------------------константы для форм, которые создают новый класс
//-------------------------------------------------------------валидации формы и принимают const=dataValidation, тем самым начиная валидацию форм
const popupEditValidator = new FormValidator(popupEdit, dataValidation);
const popupAddValidator = new FormValidator(popupAdd, dataValidation);

popupEditValidator.enableValidation();
popupAddValidator.enableValidation();

// ----------------------------------------------------------------------------- функциональность
function render() {
  /*собрать карточки и добавить в начало*/
  const htmlCards = initialCards.map((item) => {
    return new Card(".template", item).getView();
  });
  cardsContainerEl.append(...htmlCards);
}

function handleAdd(evt) {
  /*срабатывает на событие, предает значения из инпутов добавления карточки в поля карточки, которая собирается
  в новом классе new Card, добавляет в начало элемент очищает поля ввода, делает кнопку неактивной*/
  evt.preventDefault();
  const newCardText = cardInputName.value;
  const newCardSrc = cardInputSrc.value;
  const cardItem = new Card(".template", {
    name: newCardText,
    link: newCardSrc,
  });

  cardsContainerEl.prepend(cardItem.getView());

  buttonAddCard.setAttribute("disabled", "disabled");
  popupAddForm.reset();
  popupAddValidator.toggleButtonError();
  closePopup(popupAdd);
}

function openPopup(popup) {
  /* универсальная функция открытия попапа, принимает в параметр переменную, добавляет класс, открывающий попап */
  /* добавляет документу слушатель нажатия на ескейп, выполняющий функцию touchKeyClosePopup */
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", touchKeyClosePopup);
}

function closePopup(popup) {
  /* универсальная функция закрытия попапа, принимает в параметр переменную, добавляет класс, открывающий попап */
  /* удаляет с документа слушатель нажатия на ескейп */
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", touchKeyClosePopup);
}

function touchKeyClosePopup(evt) {
  /* принимает событие, если его ключ равен ескейп, то ищет по документу попап с классом открывания и применяет функцию closePopup(найденный попап) */
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function submitPopupEdit(evt) {
  /* срабатывает на событие, сохраняет значения из инпутов в поля страницы, закрывает попап редактирования профиля */
  evt.preventDefault();
  nameUser.textContent = formName.value;
  nameInfo.textContent = formInfo.value;
  closePopup(popupEdit);
}

// -----------------------------------------------слушатели

popupOverlays.forEach((overlayElement) =>
  /* применяею метод forEach для всех оверлеев, которые нашлись, и передаю каждый найденный оверлэй, затем ему  
  добавляется слушаетель события на клик, получающий евент и выполняющий функцию closePopup, которой передается
  ближайший родитель с селектором .popup*/
  {
    overlayElement.addEventListener("click", function (event) {
      closePopup(event.target.closest(".popup"));
    });
  }
);

buttonClosePopupZoom.addEventListener("click", () => closePopup(popupZoom));
popupAddForm.addEventListener("submit", handleAdd);

buttonPlusCard.addEventListener("click", () => openPopup(popupAdd));
popupAddCloseButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  /* передаю в слушатель функцию открытия попапа, которая забирает в себя значения из полей страницы (имя, описание) */
  formName.value = nameUser.textContent;
  formInfo.value = nameInfo.textContent;
});

popupEditCloseButton.addEventListener("click", () => closePopup(popupEdit));
popupEdit.addEventListener("submit", submitPopupEdit);

render();

export { openPopup };
