export class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
    }

    _hasInvalidInput(inputList){
        const checkvalid = (item) => {
            return !item.validity.valid
        };
        return inputList.some(checkvalid);
    }

    // Функция выключения кнопки Submit при непрохождении валидации 
    _toggleButtonState(inputList, submitButton){
        // Если поле не валидно, то 
        if (this._hasInvalidInput(inputList)) {
            // делаем кнопку Submit неактивной
            submitButton.classList.add(this._validationConfig.inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
            submitButton.disabled = false;
        }
    }

    _inputError(item, errorMessage){
        const error = this._form.querySelector(`.${item.id}-error`);
        item.classList.add(this._validationConfig.inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(this._validationConfig.errorClass);
    }

    _hideInputError(item){
        const error = this._form.querySelector(`.${item.id}-error`);
        item.classList.remove(this._validationConfig.inputErrorClass);
        error.textContent = " ";
        error.classList.remove(this._validationConfig.errorClass);
    }

    // Функция вывода сообщения об ошибке
    _isValid(item){
        if (!item.validity.valid) {
            this._inputError(item, item.validationMessage);
        } else {
            this._hideInputError(item);
        }
    }

    _setEventListeners(){
        // Выбираем все поля Input в форме
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        // Находим кнопку Submit
        const submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
        // Задаем начальную доступность кнопки Submit
        this._toggleButtonState(inputList, submitButton);
        // Каждому полю Input вешаем обработчик,который ...
        inputList.forEach((item) => {
            item.addEventListener('input', () => {
                // ... проверяет поле на валидность и выдает сообщение об ошибке, ...
                this._isValid(item);
                // ... и переключает состояние кнопки Submit
                this._toggleButtonState(inputList, submitButton);
            });
        });
        this._form.addEventListener('reset', () => {
            inputList.forEach((inputElement) => {
                this._hideInputError(inputElement)
            })
            submitButton.disabled = true;
        });
    }
    // Функция включения валидации
    enableValidation(){
            // ... отключаем стандартный обработчик, ...
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            // ... вешаем обработчик на поля Input
            this._setEventListeners();
    }

}


