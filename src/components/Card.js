export class Card {
    constructor(name, link, likes, cardSelector, popupImage, closeImage, handleCardClick, deleteCardClick, handleCardLike) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCardClick = deleteCardClick;
        this._handleCardLike = handleCardLike;
        this._popupImage = popupImage;
        this._closeImage = closeImage;
    }

    //Добавляем данные в разметку
    generateCard() {
        this._newCard = this._cardSelector.cloneNode(true);
        this._newCard.querySelector('.photo__card-place').src = this._link;
        this._newCard.querySelector('.photo__card-discprition').textContent = this._name;
        this._newCard.querySelector('.photo__card-place').alt = this._name;
        this._newCard.querySelector('.photo__like-counter').textContent = this._likes;
        this._setEventListeners();
        return this._newCard;
    } 

      updateLikesCount(count) {
        this._newCard.querySelector('.photo__like-counter').textContent = count;
      }

      _openLargeImage() {
        this._handleCardClick();
      }
    
      _closeLargeImage() {
        this._popupImage.classList.remove('popup_opened');
      }

      deleteCard (){
       this._newCard.remove();
       this._newCard = null;
      }

      setLiked() {
        this._newCard.querySelector('.photo__card-like').classList.add('photo__card-like_active');
      }
     
      unsetLiked() {
        this._newCard.querySelector('.photo__card-like').classList.remove('photo__card-like_active');
      }

      removeDeleteButton() {
      this._newCard.querySelector('.photo__delete-icon').remove();
      }

      _setEventListeners() {
        //Открытие большой карточки
        const cardPlace = this._newCard.querySelector('.photo__card-place');
          cardPlace.addEventListener('click', () => {
            this._openLargeImage();
          });

        //Закрытие большой карточки
        this._closeImage.addEventListener('click', () => {
          this._closeLargeImage();
        });
        
       // Удаление карточки
        const deleteButton = this._newCard.querySelector('.photo__delete-icon');
        deleteButton.addEventListener('click', () => {
          this._deleteCardClick();
        });

        //Лайк
        const like = this._newCard.querySelector('.photo__card-like');
        like.addEventListener('click', () => {
            this._handleCardLike();
        });
      }
}
    
        
  
         
