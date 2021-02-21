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

const inputError = (Form, inputSelector, errorMessage, inputErrorClass, errorClass) => {
    const error = Form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(errorClass);
  };

const hideInputError = (Form, inputSelector, inputErrorClass, errorClass) => {
    const error = Form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    error.textContent = " ";
    error.classList.remove(errorClass);
  };

// Функция вывода сообщения об ошибке
const isValid = (Form, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
        inputError(Form, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(Form, inputSelector, inputErrorClass, errorClass);
    }
};

const setEventListeners = (Form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    // Выбираем все поля Input в форме
    const inputList = Array.from(Form.querySelectorAll(inputSelector));
    // Находим кнопку Submit
    const submitButton = Form.querySelector(submitButtonSelector);
    // Задаем начальную доступность кнопки Submit
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
    // Каждому полю Input вешаем обработчик,который ...
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            // ... проверяет поле на валидность и выдает сообщение об ошибке, ...
            isValid(Form, inputSelector, inputErrorClass, errorClass);
            // ... и переключает состояние кнопки Submit
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
        });
    });
}; 

// Функция включения валидации
const enableValidation = ({Form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    // Находим все всплывающие формы
    const formList = Array.from(document.querySelectorAll(Form));
    // Для каждой найденной всплывающей формы ...
    formList.forEach((Form) => {
        // ... отключаем стандартный обработчик, ...
        Form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // ... вешаем обработчик на поля Input
        setEventListeners(Form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

// При загрузке скрипта включаем валидацию
const validationConfig = {
    Form: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

function ValidatePopupOnOpen(inputList,submitButton) {
    toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
}

enableValidation(validationConfig); 




  


