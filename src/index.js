import './pages/index.css';
import {deleteCard, likeCard, createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {initialCards} from "./components/data";
import {clearValidation, enableValidation} from "./components/validation";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const cardsPlace = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;

const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const description = popupImage.querySelector('.popup__caption');

function openPopupImage(cardData) {
    image.src = cardData.link;
    image.alt = cardData.name;
    description.textContent = cardData.name;
    openModal(popupImage);
}

/**
 * добавляет карточки на страницу
 * @param cardList {Array.<{name: string, link: string}>} массив карточек
 * @param cardsPlace {HTMLElement} контейнер, в который добавляются карточки
 */
function addCardList(cardList, cardsPlace) {
    cardList.forEach(card => {
        const cardElement = createCard(card, deleteCard, likeCard, openPopupImage);
        cardsPlace.appendChild(cardElement);
    });
}

/**
 * добавляет карточку на страницу
 * @param card {Object} карточка {name, link}
 * @param cardsPlace {HTMLElement} контейнер, в который добавляются карточки
 */
function addCard(card, cardsPlace) {
    const cardElement = createCard(card, deleteCard, likeCard, openPopupImage);
    cardsPlace.insertBefore(cardElement, cardsPlace.firstChild);
}

addCardList(initialCards, cardsPlace);

const popups = [
    {
        popupElement: popupEdit,
        openButton: editProfileButton,
    },
    {
        popupElement: popupNewCard,
        openButton: addCardButton
    },
    {
        popupElement: popupImage,
    }
]

popups.forEach((popup) => {
    if (popup.openButton) {
        popup.openButton.addEventListener('click', () => {
            clearValidation(popup.popupElement.querySelector('form'),validationConfig);
            openModal(popup.popupElement)
        });
    }
    popup.popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closeModal(popup.popupElement);
        }
    })

})

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileTitle.textContent = name;
    profileDescription.textContent = job;

    closeModal(popupEdit);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm['place-name'];
const imageUrlInput = newPlaceForm.link;

function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    addCard({
        name: placeNameInput.value,
        link: imageUrlInput.value
    }, cardsPlace)

    closeModal(popupNewCard);
    newPlaceForm.reset()
}

newPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);


enableValidation(validationConfig);


