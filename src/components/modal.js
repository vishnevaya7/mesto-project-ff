const popup_type_edit = document.querySelector('.popup_type_edit');
const popup_type_new_card  = document.querySelector('.popup_type_new-card');
const popup_type_image  = document.querySelector('.popup_type_image');


const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const imageElementByProfile = document.querySelector('.profile__image');

const  popup__close = document.querySelector('.popup__close');

export function openModal(modalObject) {
    modalObject.classList.add('popup_is-opened');
};

editProfileButton.addEventListener('click', () => openModal(popup_type_edit));
addProfileButton.addEventListener('click', () => openModal(popup_type_new_card));
imageElementByProfile.addEventListener('click', () => openModal(popup_type_image));


export function closeModal(modalObject) {
    modalObject.classList.remove('popup_is-opened');
}

popup__close.forEach((closeButton) => {
    closeButton.addEventListener('click', () => closeModal());
})

document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal();
    }
});

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeModal();
    }
});







