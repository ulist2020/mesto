import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(containerSelector, closePopupHotKey) {
        super(containerSelector, closePopupHotKey);
        this._popupDescription = this._container.querySelector('.popup__description');
        this._popupImage = this._container.querySelector('.popup__image');
    }

    open(name, link){
        super.open();
        this._name = name;
        this._link = link;
        this._popupDescription.textContent = this._name;
        this._popupImage.src = this._link;
    }

}
    
