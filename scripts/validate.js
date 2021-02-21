// Функция проверки поля на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })
  }; 

// Функция выключения кнопки Submit при непрохождении валидации
const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = false;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = true;
    }
  }; 

const inputError = (formSelector, inputSelector, errorMessage, inputErrorClass, errorClass) => {
    const error = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(errorClass);
  };

const hideInputError = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    const error = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    error.textContent = " ";
    error.classList.remove(errorClass);
  };

// Функция вывода сообщения об ошибке
const isValid = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
        inputError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formSelector, inputSelector, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    // Выбираем все поля Input в форме
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
    // Находим кнопку Submit
    const submitButton = formSelector.querySelector(submitButtonSelector);
    // Задаем начальную доступность кнопки Submit
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
    // Каждому полю Input вешаем обработчик,который ...
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            // ... проверяет поле на валидность и выдает сообщение об ошибке, ...
            isValid(formSelector, inputSelector, inputErrorClass, errorClass);
            // ... и переключает состояние кнопки Submit
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
        });
    });
}; 

// Функция включения валидации
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    // Находим все всплывающие формы
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Для каждой найденной всплывающей формы ...
    formList.forEach((formSelector) => {
        // ... отключаем стандартный обработчик, ...
        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // ... вешаем обработчик на поля Input
        setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

// При загрузке скрипта включаем валидацию

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

enableValidation(validationConfig); 




  


