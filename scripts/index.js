console.log("see");
let formElement = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupSubmitButton = popup.querySelector(".popup__submit-button");
let nameUser = document.querySelector(".profile__name");
let nameInfo = document.querySelector(".profile__name-info");

function open() {
  popup.classList.add("popup_opened");
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");
  formName.value = nameUser.innerText;
  formInfo.value = nameInfo.innerText;
}

function close() {
  popup.classList.remove("popup_opened");
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");
  formName.value = "";
  formInfo.value = "";
}

function save(evt) {
  evt.preventDefault();
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");
  popup.classList.remove("popup_opened");

  if (formName.value === "" || formInfo.value === "") {
    return;
  } else {
    nameUser.innerText = formName.value;
    nameInfo.innerText = formInfo.value;
    formName.value = "";
    formInfo.value = "";
  }
}

editButton.addEventListener("click", open);
popupCloseButton.addEventListener("click", close);
// popupSubmitButton.addEventListener("click", save);
formElement.addEventListener("submit", save);
