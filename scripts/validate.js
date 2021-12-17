const showInputError =
  /* принимает единичную форму, единичный инпут, текст об ошибке из браузера, класс инпута с ошибкой, класс спана с ошибкой. 
внутри в форме находит спан по id с помощью "id инпута" + "-error", в текстконтент ошибки записывает сообщение из браузера, 
добавляет невидимому спану класс видимости, меняет оформление инпута с ошибкой*/
  (formElement, input, errorMessageText, inputErrorClass, errorClass) => {
    const errorMessage = formElement.querySelector(`#${input.id}-error`);

    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(errorClass);
    input.classList.add(inputErrorClass);
  };

const hideInputError =
  /* принимает как showInputError, выполняет обратные действия */
  (formElement, input, inputErrorClass, errorClass) => {
    const errorMessage = formElement.querySelector(`#${input.id}-error`);

    errorMessage.textContent = "";
    errorMessage.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  };

const hasInvalidInput =
  /* принимает горку инпутов, делает из них настоящий массив, проверяет методом some, который принимает элемент
и проверяет есть ли хоть Один елемент, свойство валидности которого НЕВАЛИДНО */
  (inputs) => {
    return Array.from(inputs).some((el) => !el.validity.valid);
  };

const toggleButtonError =
  /* принимает горку инпутов, кнопку, селектор неактивной кнопки, если выполняет функцию hasInvalidInput(inputs) и получает true,
то добавляет кнопке неактивный класс и делает ненажимаемой, иначе - удаляет этот класс и делает рабочей */
  (inputs, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
    }
  };

const checkInputValidity =
  /* принимает единичную форму, единичный инпут, а также селекторы класса ошибки поля ввода и сообщения об ошибке, 
если свойство валидности инпута не валидно, то выполняет функцию showInputError , иначе hideInputError */
  (formElement, input, { inputErrorClass, errorClass }) => {
    if (!input.validity.valid) {
      showInputError(
        formElement,
        input,
        input.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      hideInputError(formElement, input, inputErrorClass, errorClass);
    }
  };

const setInputListeners =
  /* принимает в себя единичную форму, а также селекторы инпута, кнопки сохранить, ее неактивного состояния и все остальные 
создаёт массив инпутов и ищет кнопки, по инпутам методом forEach от каждого принимает отдельный инпут и выполняет проверку 
при вводе chekInputValidity и проверку можно ли делать активной кнопку toggleButtonError*/
  (
    formElement,
    { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
  ) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonError(inputs, submitButton, inactiveButtonClass);
    /* вызвал функцию проверки кнопки дважды, первый раз - дезактивация по открытию, второй раз - проверка на каждый инпут*/

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(formElement, input, rest);
        toggleButtonError(inputs, submitButton, inactiveButtonClass);
      });
    });
  };

const enableValidation =
  /* принимает в себя селектор формы и остальные значения {селектор, ...rest} деструктуризация, извлекает настоящий массив, методом forEach принимает в себя 
каждую форму по очереди и добавляет слушаетль на отправку (submit), который отменяет стандартную отправку формы, применяет функцию 
setInputListeners*/
  ({ formSelector, ...rest }) => {
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });
      setInputListeners(formElement, rest);
    });
  };

/* вызываю функцию валидации, передавая параметры, у submitButtonSelector и inactiveButtonClass я изменил значения классов, чтобы не менять файлы вёрстки */
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
