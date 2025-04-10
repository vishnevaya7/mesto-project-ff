import './pages/index.css';
import {deleteCard, likeCard, createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {clearValidation, enableValidation} from "./components/validation";
import {
    likeCardApi,
    sendNewCard,
    sendUserData,
    deleteLikeCardApi,
    deleteCardApi, changeAvatar, loadInitialData
} from "./components/api";

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
const profileImage = document.querySelector('.profile__image');


const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.name;
const aboutInput = editProfileForm.description;

const popupEditImage = document.querySelector('.popup_type_edit-image');
const editImageButton = document.querySelector('.profile__image-container');


const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');


const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const description = popupImage.querySelector('.popup__caption');


const editImageForm = document.forms['edit-avatar'];
const avatarUrlInput = editImageForm.link;

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm['place-name'];
const imageUrlInput = newPlaceForm.link;

function openPopupImage(cardData) {
    image.src = cardData.link;
    image.alt = cardData.name;
    description.textContent = cardData.name;
    openModal(popupImage);
}


const insertMethod = {
    before: (card) => cardsPlace.insertBefore(card, cardsPlace.firstChild),
    after: (card) => cardsPlace.appendChild(card)
}

function addCards(insertMethod, ...card) {
    card.forEach(card => {
        const cardElement = createCard(card, deleteCard, likeCard, openPopupImage, likeCardApi, deleteLikeCardApi, deleteCardApi);
        insertMethod(cardElement);
    });
}


loadInitialData().then(([user, cards]) => {
    localStorage.setItem('userId', user._id);
    addCards(insertMethod.after, ...cards);
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
})
    .catch(err => console.error(err))


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
    },
    {
        popupElement: popupEditImage,
        openButton: editImageButton
    }
]

popups.forEach((popup) => {
    if (popup.openButton) {

        popup.openButton.addEventListener('click', () => {
            if (popup.popupElement === popupEdit) {
                nameInput.value = profileTitle.textContent;
                aboutInput.value = profileDescription.textContent;
            }
            clearValidation(popup.popupElement.querySelector('form'), validationConfig);
            openModal(popup.popupElement);
        });
    }
    popup.popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closeModal(popup.popupElement);
        }
    })
})


editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleEditProfileFormSubmit(evt) {
    blockButton(editProfileForm.querySelector(".button"));
    evt.preventDefault();

    const name = nameInput.value;
    const about = aboutInput.value;

    sendUserData(name, about)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupEdit);
        })
        .catch(err => console.error(err))
        .finally(() => {
            unblockButton(editProfileForm.querySelector(".button"))
        });

}

newPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);

function handleAddNewPlaceFormSubmit(evt) {
    blockButton(newPlaceForm.querySelector(".button"));
    evt.preventDefault();

    sendNewCard(placeNameInput.value, imageUrlInput.value)
        .then(data => {
            addCards(insertMethod.before, data);
            closeModal(popupNewCard);
            newPlaceForm.reset();
        })
        .catch(err => console.error(err))
        .finally(() => {
            unblockButton(newPlaceForm.querySelector(".button"))

        });

}

editImageForm.addEventListener('submit', handleEditImageFormSubmit);

function handleEditImageFormSubmit(evt) {
    blockButton(editImageForm.querySelector(".button"));
    evt.preventDefault();

    changeAvatar(avatarUrlInput.value)
        .then(data => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closeModal(popupEditImage);
            editImageForm.reset();
        })
        .catch(err => console.error(err))
        .finally(() => {
            unblockButton(editImageForm.querySelector(".button"))
        });
}

function unblockButton(button) {
    return () => {
        button.disabled = false;
        button.textContent = 'Сохранить';
    }
}

function blockButton(button) {

    button.disabled = true;
    button.textContent = 'Сохранить...';

}

enableValidation(validationConfig);


