

/**
 * создает карточку
 * @param cardData {Object} карточка {name, link, likes}
 * @param deleteCardCallback {Function} функция, которая будет вызвана при
 *                           клике на кнопку удаления карточки
 * @param likeCardCallback
 * @param openPopupImageCallback
 * @param likeCardApi
 * @param deleteLikeCardApi
 * @returns {HTMLElement} созданная карточка
 */
export function createCard(cardData, deleteCardCallback, likeCardCallback, openPopupImageCallback, likeCardApi, deleteLikeCardApi, deleteCardApi) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCount = cardElement.querySelector('.card__like-count');

    cardElement.id = cardData._id;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;
    if (cardData.owner._id !== localStorage.getItem('userId')) {
        cardElement.querySelector('.card__delete-button').style.display = 'none';
    }
    if (cardData.likes.some(like => like._id === localStorage.getItem('userId'))) {
        likeCard(cardElement);
    }
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCardApi(cardElement, deleteCardCallback);
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        if (likeCardCallback(cardElement)) {
            likeCardApi(cardElement, (data) => {
                cardLikeCount.textContent = data.likes.length;
            });

        } else {
            deleteLikeCardApi(cardElement, (data) => {
                cardLikeCount.textContent = data.likes.length;
            })
        }
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
    let likeButton = cardElement.querySelector('.card__like-button')
    likeButton.classList.toggle('card__like-button_is-active');
    return likeButton.classList.contains('card__like-button_is-active');
}



