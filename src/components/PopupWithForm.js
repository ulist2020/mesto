import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(containerSelector, closePopupHotKey, {handleFormSubmit}) {
        super(containerSelector, closePopupHotKey);
        this._handleFormSubmit = handleFormSubmit;
        this._formContainer = this._container.querySelector('.popup__container');
        this._inputList = this._container.querySelectorAll('.popup__input');
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formContainer.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._formContainer.reset();
    }
    
}