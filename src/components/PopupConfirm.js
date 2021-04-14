import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(containerSelector, closePopupHotKey) {
        super(containerSelector, closePopupHotKey);
        this._handleSubmit = this.handler.bind(this);

    }

    handler(evt) {
        evt.preventDefault();
        this._handleDeleteCard();
    }

    setEventListeners(){
        super.setEventListeners();
        this._container.addEventListener('submit', this._handleSubmit);
    }
    open({handleDeleteCard}) {
        super.open();
        this._handleDeleteCard = handleDeleteCard;
    }
}