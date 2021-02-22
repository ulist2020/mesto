// Функция проверки поля на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })
  }; 

// Функция выключения кнопки Submit при непрохождении валидации
const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
    // Если поле не валидно, то 
    if (hasInvalidInput(inputList)) {
        // делаем кнопку Submit неактивной
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }
  }; 

const inputError = (form, inputSelector, errorMessage, inputErrorClass, errorClass) => {
    const error = form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(errorClass);
  };

const hideInputError = (form, inputSelector, inputErrorClass, errorClass) => {
    const error = form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    error.textContent = " ";
    error.classList.remove(errorClass);
  };

// Функция вывода сообщения об ошибке
const isValid = (form, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
        inputError(form, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(form, inputSelector, inputErrorClass, errorClass);
    }
};

const setEventListeners = (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    // Выбираем все поля Input в форме
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    // Находим кнопку Submit
    const submitButton = form.querySelector(submitButtonSelector);
    // Задаем начальную доступность кнопки Submit
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
    // Каждому полю Input вешаем обработчик,который ...
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            // ... проверяет поле на валидность и выдает сообщение об ошибке, ...
            isValid(form, inputSelector, inputErrorClass, errorClass);
            // ... и переключает состояние кнопки Submit
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
        });
    });
}; 

// Функция включения валидации
const enableValidation = ({form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    // Находим все всплывающие формы
    const formList = Array.from(document.querySelectorAll(form));
    // Для каждой найденной всплывающей формы ...
    formList.forEach((form) => {
        // ... отключаем стандартный обработчик, ...
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // ... вешаем обработчик на поля Input
        setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

// При загрузке скрипта включаем валидацию
const validationConfig = {
    form: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

function validatePopupOnOpen(inputList,submitButton) {
    toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
}

enableValidation(validationConfig); 




  


