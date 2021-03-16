import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import { initialCards } from './constants.js';

const cardEl = document.querySelector('#photo-template').content.querySelector('.photo__card');
const photoGrid = document.querySelector('.photo__grid');
const clickEditButton = document.querySelector('.profile__edit-button');
const profileEditAuthor = document.querySelector('.profile__edit-author');
const profileProfession = document.querySelector('.profile__profession');
const clickAddImageButton = document.querySelector('.profile__button');

const popupAddImageContainer = document.querySelector('#popup-addimage');
const clickAddImageCloseButton = popupAddImageContainer.querySelector('.popup__close-button');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')

const popupAuthorContainer = document.querySelector('#popup-author');
const clickAuthorCloseButton = popupAuthorContainer.querySelector('.popup__close-button');
const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');
const popupNameAuthor = popupAuthorContainer.querySelector('#popup__name-author');
const popupLinkAuthor = popupAuthorContainer.querySelector('#popup__link-author');

// При загрузке скрипта включаем валидацию
const validationConfig = {
  form: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const valAuthorForm = new FormValidator(validationConfig, formAuthorElement);
const valAddImage = new FormValidator(validationConfig, formAddImageElement);

export const popupImage = document.querySelector('#popup-image');
export const closeImage = popupImage.querySelector('.popup__close-image');
export const image = popupImage.querySelector('.popup__image');
export const imageDescription = popupImage.querySelector('.popup__description');
  
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
    popupAddImageContainer.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
  }

  // Форма добавления изображения из попапа
  function handleAddImageFormSubmit (evt){
    evt.preventDefault();
    const name = popupNameAddImage.value;
    const link = popupLinkAddImage.value;
    const card = new Card(name, link, cardEl);
    const cardElement = card.generateCard();
    photoGrid.prepend(cardElement);
    formAddImageElement.reset();
    closePopup(popupAddImageContainer);
  }

  //Перебираем карточки и встовляем в разметку
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, cardEl);
    const newCard = card.generateCard();
    // Добавляем в DOM
     photoGrid.append(newCard);
  }); 

    valAuthorForm.enableValidation();
    valAddImage.enableValidation();
    
  
    clickEditButton.addEventListener('click', openAuthorPopup);
    clickAuthorCloseButton.addEventListener('click', () => closePopup(popupAuthorContainer) );
    formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

    clickAddImageButton.addEventListener('click', openAddImagePopup);
    clickAddImageCloseButton.addEventListener('click', () => closePopup(popupAddImageContainer));

    formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);

    