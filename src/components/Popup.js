import {closePopupByKeyboard } from '../scripts/index.js';

export default class Popup {
    constructor(containerSelector) {
        this._container = containerSelector;
        this._handleEscCl = this._handleEscClose.bind(this);
        this._closeByOver = this._closeByOverlay.bind(this);
    }
  
    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscCl);
        this._container.addEventListener('click', this._closeByOver);
    }
  
    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCl);
        this._container.removeEventListener('click', this._closeByOver);
    }

    _handleEscClose(evt){
        if (evt.key === closePopupByKeyboard) {
            this.close();
          };
    }

    _closeByOverlay (evt) {
        if(evt.target.classList.contains('popup')){
            this.close();
        }
    }

    setEventListeners(){
        this._container.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    }
  }
  