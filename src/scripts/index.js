import '../pages/index.css';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';
import {FormValidator} from '../components/FormValidator.js';
import {popupImage, popupAuthorContainer, popupNameAuthor, popupLinkAuthor} from './constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import  UserInfo  from '../components/UserInfo.js';

const cardEl = document.querySelector('#photo-template').content.querySelector('.photo__card');
const photoGrid = document.querySelector('.photo__grid');
const profileEditAuthor = document.querySelector('.profile__edit-author');
const profileProfession = document.querySelector('.profile__profession');
const clickEditButton = document.querySelector('.profile__edit-button');
const clickAddImageButton = document.querySelector('.profile__button');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarUpdate = document.querySelector('.profile__avatar-update');

const popupUpdateAvatar = document.querySelector('#popup-update-avatar');
const popupUpdateContainer = popupUpdateAvatar.querySelector('.popup__update-container');

const popupAddImageContainer = document.querySelector('#popup-addimage');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link');

const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');

const popupConfirm = document.querySelector('#popup-confirm');

const popupAuthor = new Popup(popupAuthorContainer); 
const popupAddImage = new Popup(popupAddImageContainer);
  const confirm = new PopupConfirm(popupConfirm);

const buttonLoadingName = 'Сохранение...';

let userID='';
  
  const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-22',
    token: 'fd83089e-563a-4f6d-a7ca-57bbc8360c89',
    format: 'application/json'
  }); 

  //Загрузка информации о пользователе с сервера
  api.getUserInfo()
  .then((result) => {
    profileEditAuthor.textContent = result.name;
    profileProfession.textContent = result.about;
    profileAvatar.src = result.avatar;
    userID = result._id;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 

  //Загрузка карточек с сервера
  api.getInitialCards()
  .then((result) => {
    const cardsList = new Section({
      items: result,
      renderer: (item) => {
        const openLargeImage = new PopupWithImage(item.name, item.link, popupImage);
        const card = new Card(
          item.name, 
          item.link,
          item.likes.length,
          cardEl, 
          () => openLargeImage.open(),
          //Удаление карточки 
          () => {
            confirm.open(
              {handleDeleteCard: 
                () => {
                  api.deleteCard(item._id)
                  .then(() => card.deleteCard())
                  .catch(err => console.log('Ошибка при удалении'))
                }
              }
            )
          },
          // Обработчик лайков
          () => {
            // Для обновления в реальном времени счетчика кликов
            api.getInitialCards()
            .then((cardsArr) => {
              // Находим карту, которую лайкнули
              const thisCard = cardsArr.find(
                (element) => element._id === item._id
              );
              // Проверяем, ставили ли мы лайки
              const likeFlag = thisCard.likes.some(
                (element) => element._id === userID
              )
              // Если один из лайков - наш, то ставим лайк на сервере, 
              if (likeFlag) {
                api.removeLike(item._id)
                .then((result) => {
                  card.unsetLiked();
                  card.updateLikesCount(result.likes.length);
                })
                .catch(err => console.log('Ошибка при удалении'))
              } else {
                api.addLike(item._id)
                .then((result) => {
                  card.setLiked();
                  card.updateLikesCount(result.likes.length);
                })
                .catch(err => console.log('Ошибка при добавлении'))
              }
            })
          }
        );
        const newCard = card.generateCard();
        //Удаляем значок удаления с чужих карточек
        if (!(userID === item.owner._id)) {
          card.removeDeleteButton();
        }
        const likeFlag = item.likes.some(
          (element) => element._id === userID
        );
        if (likeFlag) {
          card.setLiked()
        } else {
          card.unsetLiked()
        }
        cardsList.addItem(newCard);
      },
  },
      photoGrid);
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Редактирование профиля
const formAuthor = new PopupWithForm(formAuthorElement,
  {handleFormSubmit: (data) => {
    formAuthor.changeButtonName(buttonLoadingName);
    api.editUser(data)
      .then((result) =>{
        profileEditAuthor.textContent = result.name;
        profileProfession.textContent = result.about;
        profileAvatar.src = result.avatar;
        const popup = new Popup(popupAuthorContainer);
        popup.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => formAuthor.restoreButtonName()
      ) 
   }
  })
    
  //Добавление новой карточки
  const formAddImage = new PopupWithForm(formAddImageElement,
      {handleFormSubmit: (data) => {
          formAddImage.changeButtonName(buttonLoadingName);
          api.addCard(data)
          .then((result) =>{ 
            const openLargeImage = new PopupWithImage(result.name, result.link, popupImage);
            const confirm = new PopupConfirm(popupConfirm);
            const card = new Card(
              result.name, 
              result.link,
              result.likes.length,
              cardEl, 
              () => openLargeImage.open(), 
              () => {
                confirm.open(
                  {handleDeleteCard: 
                    () => {
                      api.deleteCard(result._id)
                      .then(() => card.deleteCard())
                      .catch(err => console.log('Ошибка при удалении'))
                    }
                  }
                )
              },
              // Обработчик лайков
              () => {
            // Для обновления в реальном времени счетчика кликов
            api.getInitialCards()
                .then((cardsArr) => {
                  // Находим карту, которую лайкнули
                  const thisCard = cardsArr.find(
                    (element) => element._id === result._id
                  );
                  // Проверяем, ставили ли мы лайки
                  const likeFlag = thisCard.likes.some(
                    (element) => element._id === userID
                  )
                  // Если один из лайков - наш, то ставим лайк на сервере, 
                  if (likeFlag) {
                    api.removeLike(result._id)
                    .then((result) => {
                      card.unsetLiked();
                      card.updateLikesCount(result.likes.length);
                    })
                    .catch(err => console.log('Ошибка при удалении'))
                  } else {
                    api.addLike(result._id)
                    .then((result) => {
                      card.setLiked();
                      card.updateLikesCount(result.likes.length);
                    })
                    .catch(err => console.log('Ошибка при добавлении'))
                  }
                })
              }
                );
            const cardElement = card.generateCard();
            //Удаляем значок удаления с чужих карточек
            if (!(userID === result.owner._id)) {
              card.removeDeleteButton();
            }
          photoGrid.prepend(cardElement);
          const popup = new Popup(popupAddImageContainer);
          popup.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(
          () => formAddImage.restoreButtonName()
        ) 
        }
    });

//Изменение аватара
const formAvatar = new PopupWithForm(popupUpdateContainer,
  {handleFormSubmit: (data) => {
    formAvatar.changeButtonName(buttonLoadingName);
    api.editAvatar(data.avatar)
    .then((result) =>{
        document.querySelector('.profile__avatar').src = result.avatar;
        const popup = new Popup(popupUpdateAvatar);
        popup.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => formAvatar.restoreButtonName()
      ) 
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
const valFormAvatar = new FormValidator(validationConfig, popupUpdateContainer);
  

    //Изменение данных в попапах
    formAuthor.setEventListeners();
    formAddImage.setEventListeners();
    formAvatar.setEventListeners();

    //Слушатель клика иконке закрытия попапа
    popupAuthor.setEventListeners();    
    popupAddImage.setEventListeners();

    //Валидация форм
    valAuthorForm.enableValidation();
    valAddImage.enableValidation();
    valFormAvatar.enableValidation();

    //Открытие попапа для изменения аватара
    profileAvatarUpdate.addEventListener('click', () => {
      const popup = new Popup(popupUpdateAvatar);
      popup.open();
      popupUpdateAvatar.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

  // Открытие попапа для изменения автора
    clickEditButton.addEventListener('click', () => {
      const user = new UserInfo (profileEditAuthor, profileProfession);
      const authorInfo=user.getUserInfo();
      // Вставка значений в попап
      popupNameAuthor.value=authorInfo.name;
      popupLinkAuthor.value=authorInfo.profession;
      const popup = new Popup(popupAuthorContainer);
      popup.open();
    });

  // Открытие попапа для добавления картинки
    clickAddImageButton.addEventListener('click', () => {
      const popup = new Popup(popupAddImageContainer);
      popup.open();
      popupAddImageContainer.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

    
    
    



    