export function openModal(modalObject) {
    const closeByEsc = (evt) => {
        if (evt.key === 'Escape') {
            closeModal(modalObject);
            document.removeEventListener('keydown', closeByEsc);
        }
    };
    document.addEventListener('keydown', closeByEsc);

    modalObject.classList.add('popup_is-opened');
}

export function closeModal(modalObject) {
    modalObject.classList.remove('popup_is-opened');
}











