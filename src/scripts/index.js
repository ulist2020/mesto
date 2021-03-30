import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { initialCards } from './constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import  UserInfo  from '../components/UserInfo.js';

const cardEl = document.querySelector('#photo-template').content.querySelector('.photo__card');
const photoGrid = document.querySelector('.photo__grid');
const clickEditButton = document.querySelector('.profile__edit-button');
const clickAddImageButton = document.querySelector('.profile__button');

const popupAddImageContainer = document.querySelector('#popup-addimage');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')

const popupAuthorContainer = document.querySelector('#popup-author');
const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');
const popupNameAuthor = popupAuthorContainer.querySelector('#popup__name-author');
const popupLinkAuthor = popupAuthorContainer.querySelector('#popup__link-author');

export const popupImage = document.querySelector('#popup-image');
export const closeImage = popupImage.querySelector('.popup__close-image');
export const image = popupImage.querySelector('.popup__image');

export const closePopupByKeyboard = 'Escape';

const popupAuthor = new Popup(popupAuthorContainer); 
const popupAddImage = new Popup(popupAddImageContainer);

// Добавление карточек при загрузке страницы
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
    const openLargeImage = new PopupWithImage(item.name, item.link, popupImage);
    const card = new Card(item.name, item.link, cardEl, () => openLargeImage.open());
    const newCard = card.generateCard();
    cardsList.addItem(newCard);
    },
},
    photoGrid);

//Изменение данных в попапе с автором
const formAuthor = new PopupWithForm(formAuthorElement,
    {handleFormSubmit: () => {
      const usernew = new UserInfo (popupNameAuthor, popupLinkAuthor);
      usernew.setUserInfo();
      const popup = new Popup(popupAuthorContainer);
      popup.close();
      }
    });

//Добавление карточки в попапе
const formAddImage = new PopupWithForm(formAddImageElement,
    {handleFormSubmit: () => {
      const name = popupNameAddImage.value;
      const link = popupLinkAddImage.value;
      const openLargeImage = new PopupWithImage(name, link, popupImage);
      const card = new Card(name, link, cardEl, () => openLargeImage.open());
      const cardElement = card.generateCard();
      photoGrid.prepend(cardElement);
      const popup = new Popup(popupAddImageContainer);
      popup.close();
      }
    });

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
  
    //Добавление карочек при загрузке страницы
    cardsList.renderItems();

    //Изменение данных в попапах
    formAuthor.setEventListeners();
    formAddImage.setEventListeners();

    //Слушатель клика иконке закрытия попапа
    popupAuthor.setEventListeners();    
    popupAddImage.setEventListeners();

    //Валидация форм
    valAuthorForm.enableValidation();
    valAddImage.enableValidation();

  // Открытие попапа для изменения автора
    clickEditButton.addEventListener('click', () => {
      const user = new UserInfo (popupNameAuthor, popupLinkAuthor);
      user.getUserInfo();
      const popup = new Popup(popupAuthorContainer);
      popup.open()
    });

  // Открытие попапа для добавления картинки
    clickAddImageButton.addEventListener('click', () => {
      const popup = new Popup(popupAddImageContainer);
      popup.open();
      popupAddImageContainer.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

    
    
    



    