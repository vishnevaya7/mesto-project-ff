export function createCard(cardData, deleteCardCallback, likeCardCallback, openPopupImageCallback, likeCardApi,
                           deleteLikeCardApi, deleteCardApi) {
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
        deleteCardApi(cardElement)
            .then(res => {
                    if (res.ok) {
                        deleteCardCallback(cardElement);
                    } else {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                }
            )
            .catch(err => console.error(err));
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        if (isLiked(cardElement)) {
            deleteLikeCardApi(cardElement)
                .then(data => {
                    cardLikeCount.textContent = data.likes.length;
                    likeCard(cardElement);
                })
                .catch(err => console.error(err));
        } else {
            likeCardApi(cardElement)
                .then(data => {
                    cardLikeCount.textContent = data.likes.length;
                    likeCard(cardElement);
                })
                .catch(err => console.error(err));
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
    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.classList.toggle('card__like-button_is-active');
}

function isLiked(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button')
    return likeButton.classList.contains('card__like-button_is-active');
}



