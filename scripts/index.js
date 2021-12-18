// -----------------------------------------------------------------------------переменные общие
const formElement = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");

const popupOverlays =
  document.querySelectorAll(".popup__overlay"); /* <-- Все оверлеи */

// -----------------------------------------------------------------------------переменные создания template карточек
const cardsContainerEl = document.querySelector(".cards");
const templateEl = document.querySelector(".template");

// -----------------------------------------------------------------------------переменные попапа редактирования профиля
const popupEdite = document.querySelector(".popup-profile");
const popupCloseButton = popupEdite.querySelector(".popup__close-button");
const popupSubmitButton = popupEdite.querySelector(".popup__submit-button");
const nameUser = document.querySelector(".profile__name");
const nameInfo = document.querySelector(".profile__name-info");
const formName = popupEdite.querySelector(".popup__input_type_name");
const formInfo = popupEdite.querySelector(".popup__input_type_info");

// -----------------------------------------------------------------------------переменные попапа добавления карточки
const popupAdd = document.querySelector(".popup-add");
const buttonPlusCard = document.querySelector(".profile__add-button");
const popupAddCloseButton = popupAdd.querySelector(".popup__close-button");
const buttonAddCard = popupAdd.querySelector(".popup__submit-button");
const cardName = popupAdd.querySelector(".popup__input_type_name");
const cardSrc = popupAdd.querySelector(".popup__input_type_info");
const popupAddForm = popupAdd.querySelector(".popup__form");

// -----------------------------------------------------------------------------переменные увеличенной фотографии
const popupZoom = document.querySelector(".popup-zoom");
const popupPhotoZoom = popupZoom.querySelector(".popup__img");
const popupSubtitleZoom = popupZoom.querySelector(".popup__subtitle");
const buttonClosePopupZoom = popupZoom.querySelector(".popup__close-button");

// -----------------------------------------------------------------------------функции

function render() {
  /*собрать карточки и добавить в начало*/
  const htmlCards = initialCards.map((item) => {
    return getItem(item);
  });
  cardsContainerEl.append(...htmlCards);
}

function getItem(item) {
  /*создать карточку, присвоить ей имя альт и фото, повесить слушатель лайка, удаления, зума */
  const newCard = templateEl.content.cloneNode(true);

  const cardCommit = newCard.querySelector(".card__commit");
  cardCommit.textContent = item.name;

  const cardPhoto = newCard.querySelector(".card__photo");
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;

  const buttonDeleteCard = newCard.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", handleDelete);

  const buttonCardLike = newCard.querySelector(".card__like");
  buttonCardLike.addEventListener("click", handleCardLike);

  /*принимает свойства айтема(картчоки) name: '' ; и link: '' ; и запускает функцию */
  cardPhoto.addEventListener("click", () =>
    openPopupZoom(item.name, item.link)
  );

  return newCard; /* вернуть собранную карточку */
}

function handleAdd(evt) {
  /*срабатывает на событие, предает значения из инпутов добавления карточки в поля карточки, добавляет в начало элемент*/
  evt.preventDefault();
  const inputText = cardName.value;
  const inputSrc = cardSrc.value;
  const cardItem = getItem({ name: inputText, link: inputSrc });
  cardsContainerEl.prepend(cardItem);

  buttonAddCard.classList.add("popup__submit-button_disabled");
  buttonAddCard.setAttribute('disabled','disabled');
  cardName.value = "";
  cardSrc.value = "";
  closePopup(popupAdd);
}

function handleDelete(event) {
  /* срабатывает на событие, поднимает ближайший родительский .card, удавляет его */
  const targetCard = event.target;
  const cardItem = targetCard.closest(".card");
  cardItem.remove();
}

function handleCardLike(event) {
  /*срабатывает на событие, цель сам элемент события, добавялет/удаляет стили лайка() */
  const targetCard = event.target;
  targetCard.classList.toggle("card__like_active");
}

function openPopupZoom(name, link) {
  /* принимает два параметра (но три атрибута src,alt,name), запускает функцию открытия */
  popupPhotoZoom.src = link;
  popupPhotoZoom.alt = name;
  popupSubtitleZoom.textContent = name;
  openPopup(popupZoom);
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

function savePopup(evt) {
  /* срабатывает на событие, сохраняет значения из инпутов в поля страницы, закрывает попап редактирования профиля */
  evt.preventDefault();
  nameUser.textContent = formName.value;
  nameInfo.textContent = formInfo.value;
  closePopup(popupEdite);
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
  openPopup(popupEdite);
  /* передаю в слушатель функцию открытия попапа, которая забирает в себя значения из полей страницы (имя, описание) */
  formName.value = nameUser.textContent;
  formInfo.value = nameInfo.textContent;
});

popupCloseButton.addEventListener("click", () => closePopup(popupEdite));
formElement.addEventListener("submit", savePopup);

render();
