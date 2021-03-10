const popup = document.querySelector('.popup');
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
  
  // Форма редактирования автора
  function openAuthorPopup(){
    popupNameAuthor.value = profileEditAuthor.textContent;
    popupLinkAuthor.value = profileProfession.textContent;
    openPopup(popupAuthorContainer);
    const inputList = Array.from(popupAuthorContainer.querySelectorAll('.popup__input'));
    const submitButton = popupAuthorContainer.querySelector('.popup__button');
    validatePopupOnOpen(inputList,submitButton);
  }

  // Форма добавления картинки
function openAddImagePopup(){
    openPopup(popupAddImageContainer);
    const inputList = Array.from(popupAddImageContainer.querySelectorAll('.popup__input'));
    const submitButton = popupAddImageContainer.querySelector('.popup__button');
    validatePopupOnOpen(inputList,submitButton);
  }
  
  function handleAuthorFormSubmit (evt){
    evt.preventDefault();
    profileEditAuthor.textContent = popupNameAuthor.value;
    profileProfession.textContent = popupLinkAuthor.value;
    closePopup(popupAuthorContainer);
  }
  
  
    clickEditButton.addEventListener('click', openAuthorPopup);
    clickAuthorCloseButton.addEventListener('click', () => closePopup(popupAuthorContainer) );
    formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

    clickAddImageButton.addEventListener('click', openAddImagePopup);
    clickAddImageCloseButton.addEventListener('click', () => closePopup(popupAddImageContainer));

