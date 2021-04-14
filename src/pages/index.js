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
const openLargeImage = new PopupWithImage(popupImage, closePopupHotKey);

const cardsList = new Section({
  renderer: (item) => {
    const card = createCard (item,cardEl,userID, confirm, openLargeImage);
    const newCard = card.generateCard();
    cardsList.addItem(newCard);
    
  },
},
  photoGrid);

let userID='';
  
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: 'fd83089e-563a-4f6d-a7ca-57bbc8360c89',
  format: 'application/json'
}); 


//Загрузка информации о пользователе и карточек с сервера
Promise.all([
  api.getUser(),
  api.getInitialCards()
])
    .then((result) => {
      const [userData, initialCards] = result;
      user.setUserInfo(userData);
      userID = userData._id;
      cardsList.renderItems(initialCards);
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
        user.setUserInfo(result);
        formAuthor.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAuthor.restoreButtonName();
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
           // cardsList.renderItems(result);
           // const openLargeImage = new PopupWithImage(result.name, result.link, popupImage, closePopupHotKey);
            const card = createCard (result,cardEl,userID, confirm,openLargeImage);
            const cardElement = card.generateCard();
            cardsList.prepend(cardElement);
            formAddImage.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(
          () => {
            formAddImage.restoreButtonName();
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
        formAvatar.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAvatar.restoreButtonName()
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
//const openLargeImage = new PopupWithImage(null, null, popupImage, closePopupHotKey);
  

    //Изменение данных в попапах
    formAuthor.setEventListeners();
    formAddImage.setEventListeners();
    formAvatar.setEventListeners();
    openLargeImage.setEventListeners();
    confirm.setEventListeners();

    //Валидация форм
    valAuthorForm.enableValidation();
    valAddImage.enableValidation();
    valFormAvatar.enableValidation();

    //Открытие попапа для изменения аватара
    profileAvatarUpdate.addEventListener('click', () => {
      formAvatar.open();
      //popupUpdateAvatar.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
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
      //popupAddImageContainer.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass)
    });

    function createCard (result,cardEl,userID,confirm,openLargeImage) {
      const card = new Card(
        result,
        userID,
        cardEl,
        // Обработчик открытия большого изображения
        () => openLargeImage.open(result.name,result.link), 
        // Обработчик открытия попапа на удаления
        () => {
          confirm.open(
            {handleDeleteCard: 
              () => {
                confirm.changeButtonName(buttonLoadingName);
                api.deleteCard(result._id)
                .then(() => {
                  card.deleteCard();
                  confirm.close();
                })
                .catch(err => console.log('Ошибка при удалении'))
                .finally(() => {
                  confirm.restoreButtonName();
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
    
    



    