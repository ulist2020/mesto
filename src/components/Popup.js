import {closePopupHotKey } from '../scripts/constants.js';

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
        if (evt.key === closePopupHotKey) {
            this.close();
          };
    }

    _closeByOverlay (evt) {
        if(evt.target.classList.contains('popup')){
            this.close();
        }
    }

    changeButtonName(name) {
        this._oldButtonName = this._container.querySelector('.popup__button').textContent;
        this._container.querySelector('.popup__button').textContent = name;
    }

    restoreButtonName() {
        this._container.querySelector('.popup__button').textContent = this._oldButtonName;
    }

    setEventListeners(){
        this._container.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    }
  }
  