const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })
  }; 

const toggleButtonState = (inputList, submitButtonSelector) => {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add('popup__button_disabled');
    } else {
      submitButtonSelector.classList.remove('popup__button_disabled');
    }
  }; 

const inputErrorClass = (formSelector, inputSelector, errorMessage) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorClass.textContent = errorMessage;
    errorClass.classList.add('popup__error_visible');
  };

const hideInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorClass.textContent = " ";
    errorClass.classList.remove('popup__error_visible');
  };

const isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
        inputErrorClass(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
        hideInputError(formSelector, inputSelector);
    }
};

const setEventListeners = (formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__button');
    toggleButtonState(inputList, submitButtonSelector);
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            isValid(formSelector, inputSelector);
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
}; 

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formSelector);
    });
};

enableValidation(); 




  


