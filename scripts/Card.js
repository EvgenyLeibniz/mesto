import { openPopup } from "./index.js";
/* создаем сласс карточки, который принимаем селектор и предмет, из предмета берет
свойства item.name и item.link */
class Card {
  constructor(selector, item) {
    this._selector = selector;
    this._name = item.name;
    this._link = item.link;
  }
  /* приватный метод создаения настоящей копии элемента с селектором class='card' */
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /* создаем функцию нажатия (приватный мтеод) на кнопку делит -> удаление карточки */
  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  /* создаем приватный метод добавления и удаления класса у лайка данной карточки */
  _handleCardLike = () => {
    this._element
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  };

  /* создаем приватный метод открытия попапа при нажатии на фотографию каждой карточки
  для этого находим заново попап , передаем в него данный нашего экземпляра this._link
  и this._name , и ИМПОРТИРУЕМ из index.js функцию openPopup(), которая наследует в себя слушатель
  открытия попапа, а также закрытия на Escape */
  _openPopupZoom = () => {
    const popupZoom = document.querySelector(".popup-zoom");
    const popupPhotoZoom = popupZoom.querySelector(".popup__img");
    const popupSubtitleZoom = popupZoom.querySelector(".popup__subtitle");

    popupPhotoZoom.src = this._link;
    popupPhotoZoom.alt = this._name;
    popupSubtitleZoom.textContent = this._name;
    openPopup(popupZoom);
  };

  /* создаем публичный метод(буду использовать в основном index.js), который собирает
   карточку и присвает селекторам нужные значения, также добавляет слушаетели событий,
  которые выполняют ---> возвращает ГОТОВУЮ карточку*/
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__commit").textContent = this._name;
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(".card__photo").alt = this._name;
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);

    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._handleCardLike);
    this._element
      .querySelector(".card__photo")
      .addEventListener("click", this._openPopupZoom);
    return this._element;
  }
}
export default Card;
