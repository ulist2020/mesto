import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import { initialCards } from './constants.js';
import Section from './Section.js';
import Popup from './Popup.js';

const cardEl = document.querySelector('#photo-template').content.querySelector('.photo__card');
const photoGrid = document.querySelector('.photo__grid');
const clickEditButton = document.querySelector('.profile__edit-button');
const profileEditAuthor = document.querySelector('.profile__edit-author');
const profileProfession = document.querySelector('.profile__profession');
const clickAddImageButton = document.querySelector('.profile__button');

export const popup = document.querySelectorAll('.popup');

const popupAddImageContainer = document.querySelector('#popup-addimage');
export const clickAddImageCloseButton = popupAddImageContainer.querySelector('.popup__close-button');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')

const popupAuthorContainer = document.querySelector('#popup-author');
export const clickAuthorCloseButton = popupAuthorContainer.querySelector('.popup__close-button');
const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');
const popupNameAuthor = popupAuthorContainer.querySelector('#popup__name-author');
const popupLinkAuthor = popupAuthorContainer.querySelector('#popup__link-author');

export const popupImage = document.querySelector('#popup-image');
export const closeImage = popupImage.querySelector('.popup__close-image');
export const image = popupImage.querySelector('.popup__image');
export const imageDescription = popupImage.querySelector('.popup__description');

const popupAuthor = new Popup(popupAuthorContainer); 
const popupAddImage = new Popup(popupAddImageContainer);

// Добавление карточек при загрузке страницы
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
    const card = new Card(item.name, item.link, cardEl);
    const newCard = card.generateCard();
    cardsList.addItem(newCard);
      },
    },photoGrid);

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
  
  // Открытие попапа для изменения автора
  function openAuthorPopup(){
    popupNameAuthor.value = profileEditAuthor.textContent;
    popupLinkAuthor.value = profileProfession.textContent;
    const popup = new Popup(popupAuthorContainer);
    popup.open();
  }

  //Изменение данных в попапе с автором
  function handleAuthorFormSubmit (evt){
    evt.preventDefault();
    profileEditAuthor.textContent = popupNameAuthor.value;
    profileProfession.textContent = popupLinkAuthor.value;
    const popup = new Popup(popupAuthorContainer);
    popup.close();
  }

  // Открытие попапа для добавления картинки
  function openAddImagePopup(){
    const popup = new Popup(popupAddImageContainer);
    popup.open();
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
    const popup = new Popup(popupAddImageContainer);
    popup.close();
  }
    //Добавление карочек при загрузке страницы
    cardsList.renderItems();

    //Слушатель клика иконке закрытия попапа
    popupAuthor.setEventListeners();    
    popupAddImage.setEventListeners();

    //Валидация форм
    valAuthorForm.enableValidation();
    valAddImage.enableValidation();
  
    clickEditButton.addEventListener('click', openAuthorPopup);
    formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

    clickAddImageButton.addEventListener('click', openAddImagePopup);

    formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);
    
    
    

   
    