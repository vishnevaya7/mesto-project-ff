import {openModal} from "./modal";
import {popupImage} from "../index";

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

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCardCallback(cardElement);
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        likeCardCallback(cardElement);
    });

    cardElement.querySelector('.card__image').addEventListener('click', () => {
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

export function openPopupImage(cardData) {
    const image = popupImage.querySelector('.popup__image');
    const description = popupImage.querySelector('.popup__caption');
    image.src = cardData.link;
    image.alt = cardData.name;
    description.textContent = cardData.name;
    openModal(popupImage);
}

