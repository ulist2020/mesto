import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        }

        setEventListeners(){
            super.setEventListeners();
            this._container.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleDeleteCard();
                super.close();
              })
        }

        open({handleDeleteCard}) {
            super.open();
            this._handleDeleteCard = handleDeleteCard;
            this.setEventListeners();
        }
}