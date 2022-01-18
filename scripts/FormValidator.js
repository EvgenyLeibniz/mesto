/* создает класс выполнения валидации форм, принимает в себя форму и набор данных
для валидации из константы dataValidation (лежит в index.js) */
class FormValidator {
  constructor(formElement, dataValidation) {
    this._formElement = formElement;
    /* принимает в себя все инпуты, делает настоящий массив */
    this._inputs = Array.from(
      this._formElement.querySelectorAll(dataValidation.inputSelector)
    );
    this._submitButtonSelector = formElement.querySelector(
      dataValidation.submitButtonSelector
    );
    this._inactiveButtonClass = dataValidation.inactiveButtonClass;
    this._inputErrorClass = dataValidation.inputErrorClass;
    this._errorClass = dataValidation.errorClass;
  }

  /* приватный метод, принимает единичную форму, единичный инпут, текст об ошибке из 
  браузера, класс инпута с ошибкой, класс спана с ошибкой. Внутри в форме находит спан
  по id с помощью "id инпута" + "-error", в текстконтент ошибки записывает сообщение из браузера, 
добавляет невидимому спану класс видимости, меняет оформление инпута с ошибкой*/
  _showInputError(input, errorMessageText) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  /* приватный , принимает как _showInputError, кроме текста ошибки, выполняет наоборот*/
  _hideInputError(input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  /* приватный, принимает горку(массив) инпутов, делает из них настоящий массив (в конструкторе Array.from), 
 проверяет методом some, который принимает массив и проверяет есть ли хоть Один елемент, свойство 
 валидности которого НЕВАЛИДНО */
  _hasInvalidInput() {
    return this._inputs.some((el) => !el.validity.valid);
  }

  /* приватный, принимает , единичный инпут, сообщения об ошибке инпута, если свойство 
валидности инпута не валидно, то выполняет функцию showInputError , иначе hideInputError */
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  /* приватный, если проверка валидности  НЕвалидна ,
  то кнопке добавляет неактивный класс и состояние, иначе удаляет неактивный класс 
  и делает активной*/
  _toggleButtonError() {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }

  /* приватный, выполняет для данной формы проверну включения кнопки _toggleButtonError()(сразу отключает, т.к инпут пуст), 
берет данные инпуты _inputs(которое в коснтрукторе превратились в настоящий массив) и для каждого
выполняет метод forEach --> принимает инпут и вешает обработчик события на инпут, который при каждом инпуте 
для данного элемента выполняет проверку валидности и включения/отключения кнопки */
  _setInputListeners() {
    this._toggleButtonError();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonError();
      });
    });
  }

  /* публичный метод включения валидации формы, который выполняет для любой переданной формы отключение
   стандартной отправки формы, а также выполняет приватный метод _setInputListenners(), который следит за кнопкой,
   и валидностью введенных данных  */
  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setInputListeners();
  }
}

export default FormValidator;
