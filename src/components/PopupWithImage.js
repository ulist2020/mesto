import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	    constructor(name, link, containerSelector, closePopupHotKey) {
            super(containerSelector, closePopupHotKey);
            this._name = name;
            this._link = link;

        }

        open(){
            super.open();
            this._container.querySelector('.popup__description').textContent = this._name;
            this._link = this._container.querySelector('.popup__image').src = this._link;
        }

}
    
