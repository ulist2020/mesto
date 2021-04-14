
export default class Popup {
    constructor(containerSelector, closePopupHotKey) {
        this._container = containerSelector;
        this._handleEscCl = this._handleEscClose.bind(this);
        this._closeByOver = this._closeByOverlay.bind(this);
        this._close = this.close.bind(this);
        this._closePopupHotKey = closePopupHotKey;
    }
  
    open() {
        this._container.classList.add('popup_opened');
    }
  
    close() {
        this._container.classList.remove('popup_opened');
    }

    _handleEscClose(evt){
        if (evt.key === this._closePopupHotKey) {
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
        this._container.querySelector('.popup__close-button').addEventListener('click', this._close);
        this._container.addEventListener('click', this._closeByOver);
        document.addEventListener('keydown', this._handleEscCl);
    }
  }
  