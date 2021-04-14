import '../pages/index.css';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import  UserInfo  from '../components/UserInfo.js';

import {popupAuthorContainer, popupNameAuthor, popupLinkAuthor, popupImage, cardEl, photoGrid, profileEditAuthor, profileProfession,
  clickEditButton, clickAddImageButton, profileAvatar, profileAvatarUpdate, popupUpdateAvatar, popupUpdateContainer, popupAddImageContainer,
  formAddImageElement, formAuthorElement, popupConfirm, closePopupHotKey, buttonLoadingName } from '../utils/constants.js';

const confirm = new PopupConfirm(popupConfirm, closePopupHotKey);
const user = new UserInfo (profileEditAuthor, profileProfession, profileAvatar);


let userID='';
  
  const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-22',
    token: 'fd83089e-563a-4f6d-a7ca-57bbc8360c89',
    format: 'application/json'
  }); 

  //Загрузка информации о пользователе с сервера
  api.getUser()
  .then((result) => {
    user.setUserInfo(result);
    //profileEditAuthor.textContent = result.name;
    //profileProfession.textContent = result.about;
    //profileAvatar.src = result.avatar;
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
        // тест
        const openLargeImage = new PopupWithImage(item.name, item.link, popupImage, closePopupHotKey);
        const card = createCard (item,cardEl,userID, confirm, openLargeImage);
        const newCard = card.generateCard();
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
const formAuthor = new PopupWithForm(popupAuthorContainer, closePopupHotKey, 
  {handleFormSubmit: (data) => {
    formAuthor.changeButtonName(buttonLoadingName);
    api.editUser(data)
      .then((result) =>{
        profileEditAuthor.textContent = result.name;
        profileProfession.textContent = result.about;
        profileAvatar.src = result.avatar;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAuthor.restoreButtonName();
          formAuthor.close();
        }
      ) 
   }
  })
    
  //Добавление новой карточки
  const formAddImage = new PopupWithForm(
      popupAddImageContainer,
      closePopupHotKey, 
      {handleFormSubmit: (data) => {
          formAddImage.changeButtonName(buttonLoadingName);
          api.addCard(data)
          .then((result) =>{ 
            const openLargeImage = new PopupWithImage(result.name, result.link, popupImage, closePopupHotKey);
            const card = createCard (result,cardEl,userID, confirm,openLargeImage);
            const cardElement = card.generateCard();
          photoGrid.prepend(cardElement);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(
          () => {
            formAddImage.restoreButtonName();
            formAddImage.close();
          }
        ) 
        }
    });


//Изменение аватара
const formAvatar = new PopupWithForm(popupUpdateAvatar, closePopupHotKey, 
  {handleFormSubmit: (data) => {
    formAvatar.changeButtonName(buttonLoadingName);
    api.editAvatar(data.avatar)
    .then((result) =>{
      user.setUserInfo(result);
        //document.querySelector('.profile__avatar').src = result.avatar;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAvatar.restoreButtonName()
          formAvatar.close();
        }
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
// Создаем пустой попап, чтобы повесить закрытие на оверлей или Esc
const openLargeImage = new PopupWithImage(null, null, popupImage, closePopupHotKey);
  

    //Изменение данных в попапах
    formAuthor.setEventListeners();
    formAddImage.setEventListeners();
    formAvatar.setEventListeners();
    openLargeImage.setEventListeners();

    //Валидация форм
    valAuthorForm.enableValidation();
    valAddImage.enableValidation();
    valFormAvatar.enableValidation();

    //Открытие попапа для изменения аватара
    profileAvatarUpdate.addEventListener('click', () => {
      formAvatar.open();
      popupUpdateAvatar.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

  // Открытие попапа для изменения автора
    clickEditButton.addEventListener('click', () => {
      const authorInfo = user.getUserInfo();
        // Вставка значений в попап
        popupNameAuthor.value=authorInfo.name;
        popupLinkAuthor.value=authorInfo.profession;
        formAuthor.open();
    });

  // Открытие попапа для добавления картинки
    clickAddImageButton.addEventListener('click', () => {
      formAddImage.open();
      popupAddImageContainer.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

    function createCard (result,cardEl,userID,confirm,openLargeImage) {
      const card = new Card(
        result,
        userID,
        cardEl,
        // Обработчик открытия большого изображения
        () => openLargeImage.open(), 
        // Обработчик открытия попапа на удаления
        () => {
          confirm.open(
            {handleDeleteCard: 
              () => {
                confirm.changeButtonName(buttonLoadingName);
                api.deleteCard(result._id)
                .then(() => card.deleteCard())
                .catch(err => console.log('Ошибка при удалении'))
                .finally(() => {
                  confirm.close();
                  confirm.restoreButtonName()
                })
              }
            }
          )
        },
        // Обработчик нажатия на сердце
        () => {
          // Для обновления в реальном времени счетчика кликов
            
            if (card.isLiked) {
              api.removeLike(result._id)
              .then((result) => {
                card.unsetLiked();
                card.updateLikes(result.likes);
              })
              .catch(err => console.log('Ошибка при удалении'))
            } else {
              api.addLike(result._id)
              .then((result) => {
                card.setLiked();
                card.updateLikes(result.likes);
              })
              .catch(err => console.log('Ошибка при добавлении'))
            }
        }
      );
      return card;
    }
    
    



    