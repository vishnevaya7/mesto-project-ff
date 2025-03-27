function closeByEsc(evt) {
    if (evt.key === 'Escape') {
       const modal = document.querySelector('.popup_is-opened');
        closeModal(modal);
    }
}

export function openModal(modalObject) {
    modalObject.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(modalObject) {
    modalObject.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}











