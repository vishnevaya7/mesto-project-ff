export function init(initialCards) {

    const placesList = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;


    function createCard(cardData, deleteCardCallback) {

        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        cardElement.querySelector('.card__image').src = cardData.link;
        cardElement.querySelector('.card__image').alt = cardData.name;
        cardElement.querySelector('.card__title').textContent = cardData.name;

        cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
            deleteCardCallback(cardElement);
        });

        return cardElement;
    }


    function deleteCard(cardElement) {
        cardElement.remove();
    }


    initialCards.forEach(card => {
        const cardElement = createCard(card, deleteCard);
        placesList.appendChild(cardElement);
    });
}

