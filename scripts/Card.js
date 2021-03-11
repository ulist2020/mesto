import { openPopup, closePopup, initialCards, photoGrid, popupImage, image, closeImage, imageDescription } from './index.js';

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }
    //Возвращаем разметку карточки
    _getTemplate() {
        const cardElement = document
        .querySelector('#photo-template')
        .content
        .querySelector('.photo__card')
        .cloneNode(true);

        return cardElement;
    }
    //Добавляем данные в разметку
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();
        // Добавим данные
        this._element.querySelector('.photo__card-place').src = this._link;
        this._element.querySelector('.photo__card-discprition').textContent = this._name;
        // Вернём элемент наружу
        return this._element;
      } 

      _openLargeImage() {
        image.src = this._link;
        imageDescription.textContent = this._name;
        openPopup(popupImage);
      }
    
      _closeLargeImage() {
        closePopup(popupImage);
      }

      _deleteCard (evt){
        evt.target.closest('.photo__card').remove();
      }

      _clickLike (evt) {
        evt.target.classList.toggle('photo__card-like_active');
      }
     
      _setEventListeners() {
        //Открытие большой карточки
        const cardPlace = this._element.querySelector('.photo__card-place');
        cardPlace.addEventListener('click', () => {
          this._openLargeImage();
        });

        //Закрытие большой карточки
        closeImage.addEventListener('click', () => {
          this._closeLargeImage();
        });
        
        //Удаление карточки
        const deleteButton = this._element.querySelector('.photo__delete-icon');
        deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
          });

        //Лайк
        const like = this._element.querySelector('.photo__card-like');
        like.addEventListener('click', (evt) => {
            this._clickLike(evt);
        });

    }
}
    
        //перебираем карточки и встовляем в разметку
        initialCards.forEach((item) => {
          // Создадим экземпляр карточки
          const card = new Card(item.name, item.link);
          // Создаём карточку и возвращаем наружу
          const cardElement = card.generateCard();
          // Добавляем в DOM
          photoGrid.append(cardElement);
        }); 
  
         
