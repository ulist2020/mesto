import {Card} from './Card.js';

export const initialCards = [
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

export const popup = document.querySelector('.popup');
export const clickEditButton = document.querySelector('.profile__edit-button');
export const profileEditAuthor = document.querySelector('.profile__edit-author');
export const profileProfession = document.querySelector('.profile__profession');

export const clickAddImageButton = document.querySelector('.profile__button');

export const popupAddImageContainer = document.querySelector('#popup-addimage');
export const clickAddImageCloseButton = popupAddImageContainer.querySelector('.popup__close-button');
export const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
export const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
export const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')

export const popupAuthorContainer = document.querySelector('#popup-author');
export const clickAuthorCloseButton = popupAuthorContainer.querySelector('.popup__close-button');
export const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');
export const popupNameAuthor = popupAuthorContainer.querySelector('#popup__name-author');
export const popupLinkAuthor = popupAuthorContainer.querySelector('#popup__link-author');

export const popupImage = document.querySelector('#popup-image');
export const closeImage = popupImage.querySelector('.popup__close-image');
export const image = popupImage.querySelector('.popup__image');
export const imageDescription = popupImage.querySelector('.popup__description');

export const photoGrid = document.querySelector('.photo__grid');
  
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEsc); 
  }
  
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', handleEsc); 
  } 
  
  function closeByOverlay (evt) {
    if(evt.target.classList.contains('popup')){
      closePopup(document.querySelector('.popup_opened'));
    }
  }
  
  function handleEsc (evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    };
  }
  
  // Открытие попапа для изменения автора
  function openAuthorPopup(){
    popupNameAuthor.value = profileEditAuthor.textContent;
    popupLinkAuthor.value = profileProfession.textContent;
    openPopup(popupAuthorContainer);
    const inputList = Array.from(popupAuthorContainer.querySelectorAll('.popup__input'));
    const submitButton = popupAuthorContainer.querySelector('.popup__button');
    validatePopupOnOpen(inputList,submitButton);
  }

    //Изменение данных в попапе с автором
    function handleAuthorFormSubmit (evt){
        evt.preventDefault();
        profileEditAuthor.textContent = popupNameAuthor.value;
        profileProfession.textContent = popupLinkAuthor.value;
        closePopup(popupAuthorContainer);
      }

  // Открытие попапа для добавления картинки
    function openAddImagePopup(){
        openPopup(popupAddImageContainer);
        const inputList = Array.from(popupAddImageContainer.querySelectorAll('.popup__input'));
        const submitButton = popupAddImageContainer.querySelector('.popup__button');
        validatePopupOnOpen(inputList,submitButton);
    }

  // Форма добавления изображения из попапа
    function handleAddImageFormSubmit (evt){
        evt.preventDefault();
        const name = popupNameAddImage.value;
        const link = popupLinkAddImage.value;
        const card = new Card(name, link);
        const cardElement = card.generateCard();
        photoGrid.prepend(cardElement);
        popupNameAddImage.value = '';
        popupLinkAddImage.value = '';
        closePopup(popupAddImageContainer);
    }
  
    clickEditButton.addEventListener('click', openAuthorPopup);
    clickAuthorCloseButton.addEventListener('click', () => closePopup(popupAuthorContainer) );
    formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

    clickAddImageButton.addEventListener('click', openAddImagePopup);
    clickAddImageCloseButton.addEventListener('click', () => closePopup(popupAddImageContainer));

    formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);

