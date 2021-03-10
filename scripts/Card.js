const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const photoGrid = document.querySelector('.photo__grid');

const popupImage = document.querySelector('#popup-image');
const image = popupImage.querySelector('.popup__image');
const closeImage = popupImage.querySelector('.popup__close-image');
const imageDescription = popupImage.querySelector('.popup__description');

const popupAddImageContainer = document.querySelector('#popup-addimage');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')


import { openPopup, closePopup } from './index.js';

class Card {
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

      //Добавление карточки из попапа
      handleAddImageFormSubmit (evt){
        evt.preventDefault();
        const name = popupNameAddImage.value;
        const link = popupLinkAddImage.value;
        const nameList = this.generateCard({name:name, link:link});
        photoGrid.prepend(nameList);
        popupNameAddImage.value = '';
        popupLinkAddImage.value = '';
        closePopup(popupAddImageContainer);

        
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

        //Добавление карточки из попапа
        formAddImageElement.addEventListener('submit', (evt) => {
            this.handleAddImageFormSubmit(evt)
        });
    }
}

initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    
  
    // Добавляем в DOM
    photoGrid.append(cardElement);
  }); 

  
