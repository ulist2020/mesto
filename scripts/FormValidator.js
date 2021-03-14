// При загрузке скрипта включаем валидацию
const validationConfig = {
    form: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

export class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._$form = form;
        console.log(this._validationConfig);
        console.log(this._$form);
        
    }

    _hasInvalidInput(inputList){
        const checkvalid = (item) => {
            return !item.validity.valid;
        };
        return inputList.some(checkvalid);

    }

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
        const error = this._$form.querySelector(`.${item.id}-error`);
        item.classList.add(this._validationConfig.inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(this._validationConfig.errorClass);
    
    }

    _hideInputError(item){
        const error = this._$form.querySelector(`.${item.id}-error`);
        item.classList.remove(this._validationConfig.inputErrorClass);
        error.textContent = " ";
        error.classList.remove(this._validationConfig.errorClass);
    

    }

    _isValid(item){
        if (!item.validity.valid) {
            this._inputError(item, item.validationMessage);
        } else {
            this._hideInputError(item);
        }

    }

    _setEventListeners(){
        // Выбираем все поля Input в форме
        const inputList = Array.from(this._$form.querySelectorAll(this._validationConfig.inputSelector));
        // Находим кнопку Submit
        const submitButton = this._$form.querySelector(this._validationConfig.submitButtonSelector);
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

    }

    enableValidation(){
            // ... отключаем стандартный обработчик, ...
            this._$form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            // ... вешаем обработчик на поля Input
            this._setEventListeners();
        


    }

    _validatePopupOnOpen(){
         toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
    }

}


