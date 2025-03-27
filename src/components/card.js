
/**
 * создает карточку
 * @param cardData {Object} карточка {name, link}
 * @param deleteCardCallback {Function} функция, которая будет вызвана при
 *                           клике на кнопку удаления карточки
 * @param likeCardCallback
 * @param openPopupImageCallback
 * @returns {HTMLElement} созданная карточка
 */
export function createCard(cardData, deleteCardCallback, likeCardCallback, openPopupImageCallback ) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCardCallback(cardElement);
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        likeCardCallback(cardElement);
    });

    cardImage.addEventListener('click', () => {
        openPopupImageCallback(cardData);
    })

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
 * @param cardElement {HTMLElement} карточка, которую лайкнули
 */
export function likeCard(cardElement) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}



