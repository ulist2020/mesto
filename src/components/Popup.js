import {popup, clickAuthorCloseButton, clickAddImageCloseButton } from '../scripts/index.js';

export default class Popup {
    constructor(containerSelector) {
        this._container = containerSelector;
    }
  
    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            const popupEsc = new Popup(document.querySelector('.popup_opened'));
            popupEsc.close()
          };
    }

    setEventListeners(){
        const pop = new Popup(popup);
        clickAuthorCloseButton.addEventListener('click', () => this.close(pop) );
        clickAddImageCloseButton.addEventListener('click', () => this.close(pop));
    }
  }
  