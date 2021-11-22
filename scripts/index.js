const formElement = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupSubmitButton = popup.querySelector(".popup__submit-button");
const nameUser = document.querySelector(".profile__name");
const nameInfo = document.querySelector(".profile__name-info");
const formName = popup.querySelector(".popup__input_type_name");
const formInfo = popup.querySelector(".popup__input_type_info");

function openPopup() {
  popup.classList.add("popup_opened");
  formName.value = nameUser.textContent;
  formInfo.value = nameInfo.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function savePopup(evt) {
  evt.preventDefault();
    nameUser.textContent = formName.value;
    nameInfo.textContent = formInfo.value;
    closePopup();
}

editButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", savePopup);


