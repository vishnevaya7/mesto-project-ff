import './pages/index.css';
import { addCard, deleteCard, likeCard, addCardList } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const cardsPlace = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard  = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');


{
// const popupImage  = document.querySelector('.popup_type_image');
// const popupImageCloseButton = popupImage.querySelector('.popup__close')
// const cardImage = document.querySelector('.places__list');
}

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

addCardList(initialCards, cardsPlace);

const popups = [
    {
        popupElement: popupEdit,
        openButton: editProfileButton
    },
    {
        popupElement: popupNewCard,
        openButton: addCardButton
    },
]

popups.forEach((popup) => {
    popup.openButton.addEventListener('click', () => openModal(popup.popupElement));
    popup.popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')||evt.target.classList.contains('popup__close')) {
            closeModal(popup.popupElement);
        }
    })
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closeModal(popup.popupElement);
        }
    })
})