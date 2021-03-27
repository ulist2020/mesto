import {popup, clickAuthorCloseButton, clickAddImageCloseButton } from '../scripts/index.js';

export default class Popup {
    constructor(containerSelector) {
        this._container = containerSelector;
    }
  
    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._closeByOverlay);
    }
  
    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._closeByOverlay);
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            const popupEsc = new Popup(document.querySelector('.popup_opened'));
            popupEsc.close();
          };
    }

    _closeByOverlay (evt) {
        if(evt.target.classList.contains('popup')){
            const popupOverlay = new Popup(document.querySelector('.popup_opened'));
            popupOverlay.close();
        }
      }

    setEventListeners(){
        const pop = new Popup(popup);
        clickAuthorCloseButton.addEventListener('click', () => this.close(pop) );
        clickAddImageCloseButton.addEventListener('click', () => this.close(pop));
    }
  }
  