import {popupImage, closeImage } from '../scripts/index.js';

export class Card {
    constructor(name, link, cardElement, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardElement = cardElement;
        this._handleCardClick = handleCardClick;
    }

    //Добавляем данные в разметку
    generateCard() {
        this._newCard = this._cardElement.cloneNode(true);
        this._newCard.querySelector('.photo__card-place').src = this._link;
        this._newCard.querySelector('.photo__card-discprition').textContent = this._name;
        this._newCard.querySelector('.photo__card-place').alt = this._name;
        this._setEventListeners();
        return this._newCard;
      } 

      _openLargeImage() {
        this._handleCardClick();
      }
    
      _closeLargeImage() {
        popupImage.classList.remove('popup_opened');
      }

      _deleteCard (){
       this._newCard.remove();
       this._newCard = null;
      }

      _clickLike (evt) {
        evt.target.classList.toggle('photo__card-like_active');
      }
     
      _setEventListeners() {
        //Открытие большой карточки
        const cardPlace = this._newCard.querySelector('.photo__card-place');
          cardPlace.addEventListener('click', () => {
            this._openLargeImage();
          });

        //Закрытие большой карточки
        closeImage.addEventListener('click', () => {
          this._closeLargeImage();
        });
        
        //Удаление карточки
        const deleteButton = this._newCard.querySelector('.photo__delete-icon');
        deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
          });

        //Лайк
        const like = this._newCard.querySelector('.photo__card-like');
        like.addEventListener('click', (evt) => {
            this._clickLike(evt);
        });

    }
}
    
        
  
         
