
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');
    } else {
        buttonElement.classList.remove('button_inactive');
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

                    checkValidity(inputElement,form);

                    toggleButtonState(inputElements, buttonElement);
                }
            )
        })
    })
}

function checkValidity(inputElement, form) {
    if (!inputElement.isValid) {
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
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(settings.errorClass);
    }
}