const formElement = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupSubmitButton = popup.querySelector(".popup__submit-button");
let nameUser = document.querySelector(".profile__name");
let nameInfo = document.querySelector(".profile__name-info");
let formName = popup.querySelector(".popup__input_name");
let formInfo = popup.querySelector(".popup__input_info");

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

  if (formName.value.length >= 2 && formInfo.value.length >= 2) {
    popup.classList.remove("popup_opened");
    nameUser.textContent = formName.value;
    nameInfo.textContent = formInfo.value;
  } else {
    return;
  }
}

editButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", savePopup);

// Зравствуйте, Алексей! Большое спасибо Вам за хорошее и понятное ревью, почерпнул для себя много интересных моментов, которые вряд ли узнал бы без встречи с Вами :)

// Я не смог до конца разобраться стоит ли в блоке cards элементам card присваивать семантическую обертку article, если до этого сделал из них список..

// В js файле постарался изменить проверку по методике, которую вы посоветовали, но до конца не разобрался когда стоит использовать метод popup.classList.remove("popup_opened") в блоке функции
// savePopup() - в условии if или же после выполнения обоих условий (поэтому поставил в условии запуска функции, но был бы признателен Вам за совет).

// В остальном постарался по максимум учесть замечания
