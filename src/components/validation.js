function showInputError(errorElement, inputElement, settings) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(errorElement, inputElement, settings) {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

export function clearValidation(form, settings) {
    const buttonElement = form.querySelector(settings.submitButtonSelector);
    const inputElements = Array.from(form.querySelectorAll(settings.inputSelector));
    inputElements.forEach(inputElement => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        hideInputError(errorElement, inputElement, settings);
    })
    buttonElement.classList.add(settings.inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

export function enableValidation(settings) {
    const formsValidate = Array.from(document.querySelectorAll(settings.formSelector));
    formsValidate.forEach((form) => {
        const inputElements = Array.from(form.querySelectorAll(settings.inputSelector));
        const buttonElement = form.querySelector(settings.submitButtonSelector);

        inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                    checkValidity(inputElement, form, settings);
                    toggleButtonState(inputElements, buttonElement, settings.inactiveButtonClass);
                }
            )
        })
    })
}

function checkValidity(inputElement, form, settings) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.setCustomValidity('');
    if (!inputElement.validity.valid) {
        inputElement.classList.add(settings.inputErrorClass);
        if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            inputElement.setCustomValidity(inputElement.dataset.lengthError
                .replace('{minlength}', inputElement.minLength)
                .replace('{maxlength}', inputElement.maxLength)
            );
        } else if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.patternError);
        } else if (inputElement.validity.typeMismatch) {
            if (inputElement.type === 'url') {
                inputElement.setCustomValidity(inputElement.dataset.urlError);
            }
        } else {
            inputElement.setCustomValidity("");
        }
        showInputError(errorElement, inputElement, settings);
    } else {
        hideInputError(errorElement, inputElement, settings);
    }
}