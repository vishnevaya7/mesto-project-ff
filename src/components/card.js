/**
 * создает карточку
 * @param cardData {Object} карточка {name, link}
 * @param deleteCardCallback {Function} функция, которая будет вызвана при
 *                           клике на кнопку удаления карточки
 * @returns {HTMLElement} созданная карточка
 */
function createCard(cardData, deleteCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCardCallback(cardElement);
    });

    return cardElement;
}
/**
 * удаляет карточку
 * @param cardElement {HTMLElement} карточка, которую необходимо удалить
 */
export function deleteCard(cardElement) {
    cardElement.remove();
}

/**
 * обработчик лайка карточки
 * @param evt {Event} событие
 */
export function likeCard(evt) {
}

/**
 * добавляет карточки на страницу
 * @param cardList {Array.<{name: string, link: string}>} массив карточек
 * @param cardsPlace {HTMLElement} контейнер, в который добавляются карточки
 */
export function addCardList(cardList, cardsPlace) {
    cardList.forEach(card => {
        addCard(card, cardsPlace);
    });
}

/**
 * добавляет карточку на страницу
 * @param card {Object} карточка {name, link}
 * @param cardsPlace {HTMLElement} контейнер, в который добавляются карточки
 */
export function addCard(card, cardsPlace) {
    const cardElement = createCard(card, deleteCard);
    cardsPlace.appendChild(cardElement);
}