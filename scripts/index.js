console.log("see");

const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupSudbmitButton = popup.querySelector(".popup__submit-button");
let nameUser = document.querySelector(".profile__name");
let nameInfo = document.querySelector(".profile__name-info");
console.dir(nameUser);
function open() {
  popup.classList.add("popup_opened");
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");
  formName.value = nameUser.innerText;
  formInfo.value = nameInfo.innerText;
}

function close(evt) {
  evt.preventDefault();
  popup.classList.remove("popup_opened");
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");
  formName.value = "";
  formInfo.value = "";
}

function save(evt) {
  evt.preventDefault();
  popup.classList.remove("popup_opened");
  let formName = popup.querySelector(".popup__name");
  let formInfo = popup.querySelector(".popup__name-info");

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
popupSudbmitButton.addEventListener("click", save);
