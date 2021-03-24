import {popupImage, image, closeImage, imageDescription } from './index.js';
import Popup from './Popup.js';

export class Card {
    constructor(name, link, cardElement) {
        this._name = name;
        this._link = link;
        this._cardElement = cardElement;
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
        image.src = this._link;
        imageDescription.textContent = this._name;
        const popup = new Popup(popupImage);
        popup.open();
       // openPopup(popupImage);
      }
    
      _closeLargeImage() {
        const popup = new Popup(popupImage);
        popup.close();
        //closePopup(popupImage);
      }

      _deleteCard (evt){
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
    
        
  
         
