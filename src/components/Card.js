export class Card {
    constructor(card, userID, cardSelector, handleCardClick, deleteCardClick, handleCardLike) {
        this._name = card.name;
        this._link = card.link;
        this._likesArray = card.likes;
        this._owner = card.owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCardClick = deleteCardClick;
        this._handleCardLike = handleCardLike;
        this._userID = userID;
    }

    //Добавляем данные в разметку
    generateCard() {
        this._newCard = this._cardSelector.cloneNode(true);
        this._photoCardPlace=this._newCard.querySelector('.photo__card-place');
        this._photoCardLike=this._newCard.querySelector('.photo__card-like');
        this._photoCardPlace.src = this._link;
        this._newCard.querySelector('.photo__card-discprition').textContent = this._name;
        this._photoCardPlace.alt = this._name;
        this._newCard.querySelector('.photo__like-counter').textContent = this._likesArray.length;
        this._setEventListeners();
        if (this._checkOurLike()) {
          this.setLiked()
        } else {
          this.unsetLiked()
        }
        if (!(this._userID === this._owner._id)) {
          this._removeDeleteButton();
        }

        return this._newCard;
    } 

      _checkOurLike () {
        // Проверяем, ставили ли мы лайки
        return this._likesArray.some(
          (element) => element._id === this._userID
        );
      }

      updateLikes(data) {
        this._likesArray=data;
        this._newCard.querySelector('.photo__like-counter').textContent = this._likesArray.length;
      }

      deleteCard (){
       this._newCard.remove();
       this._newCard = null;
      }

      setLiked() {
        this._photoCardLike.classList.add('photo__card-like_active');
        this.isLiked=true;
      }
     
      unsetLiked() {
        this._photoCardLike.classList.remove('photo__card-like_active');
        this.isLiked=false;
      }

      _removeDeleteButton() {
      this._newCard.querySelector('.photo__delete-icon').remove();
      }

      _setEventListeners() {
        //Открытие большой карточки
        const cardPlace = this._newCard.querySelector('.photo__card-place');
          cardPlace.addEventListener('click', () => {
            this._handleCardClick();
          });

       // Удаление карточки
        const deleteButton = this._newCard.querySelector('.photo__delete-icon');
        deleteButton.addEventListener('click', () => {
          this._deleteCardClick();
        });

        //Лайк
        this._photoCardLike.addEventListener('click', () => {
            this._handleCardLike();
        });
      }
}
    
        
  
         
