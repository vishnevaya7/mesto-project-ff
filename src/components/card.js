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

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function likeCard(evt) {
    // Обработчик лайка карточки
}

export function addCardList(cardList, placesList) {
    cardList.forEach(addCard);
}

/**
 * @param card {Object} карточка которую мы добавляем
 * @param placesList {HTMLElement} место для вставки карточек
 */
export function addCard(card, placesList) {
    const cardElement = createCard(card, deleteCard);
    placesList.appendChild(cardElement);
}