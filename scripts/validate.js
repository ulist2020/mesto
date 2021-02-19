const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
  
      return !inputSelector.validity.valid;
    })
  }; 

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, submitButtonSelector) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      submitButtonSelector.classList.add('popup__button_disabled');
    } else {
      // иначе сделай кнопку активной
      submitButtonSelector.classList.remove('popup__button_disabled');
    }
  }; 



// Функция, которая добавляет класс с ошибкой
const inputErrorClass = (formSelector, inputSelector, errorMessage) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorClass.textContent = errorMessage;
    errorClass.classList.add('popup__error_visible');
  };

  // Функция, которая удаляет класс с ошибкой
    const hideInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorClass.textContent = " ";
    errorClass.classList.remove('popup__error_visible');
  };

  // Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        inputErrorClass(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
        // Если проходит, скроем
        hideInputError(formSelector, inputSelector);
    }
};

const setEventListeners = (formSelector) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__button');
    toggleButtonState(inputList, submitButtonSelector);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
        // каждому полю добавим обработчик события input
        inputSelector.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            //alert('hello');
            isValid(formSelector, inputSelector);
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
}; 

const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__container'));

      //console.log(formList);
     // Переберём полученную коллекцию
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            //formSelector.querySelector('.popup__button').classList.add('popup__button_disabled');
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formSelector);
    });
};

// Вызовем функцию
enableValidation(); 




  


