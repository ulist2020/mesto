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
const photoTemplate = document.querySelector('#photo-template').content;

const clickEditButton = document.querySelector('.profile__edit-button');
const profileEditAuthor = document.querySelector('.profile__edit-author');
const profileProfession = document.querySelector('.profile__profession');
const clickAddImageButton = document.querySelector('.profile__button');
const clickImage = photoTemplate.querySelector('.photo__card-place');

const popup = document.querySelector('.popup');
const popupAll = Array.from(document.querySelectorAll('.popup'));

const popupAuthorContainer = document.querySelector('#popup-author');
const clickAuthorCloseButton = popupAuthorContainer.querySelector('.popup__close-button');
const formAuthorElement = popupAuthorContainer.querySelector('.popup__container');
const popupNameAuthor = popupAuthorContainer.querySelector('#popup__name');
const popupLinkAuthor = popupAuthorContainer.querySelector('#popup__link');

const popupAddImageContainer = document.querySelector('#popup-addimage');
const clickAddImageCloseButton = popupAddImageContainer.querySelector('.popup__close-button');
const formAddImageElement = popupAddImageContainer.querySelector('.popup__container');
const popupNameAddImage = popupAddImageContainer.querySelector('#popup__name');
const popupLinkAddImage = popupAddImageContainer.querySelector('#popup__link')

const popupImage = document.querySelector('#popup-image');
const closeImage = popupImage.querySelector('.popup__close-image');
const image = popupImage.querySelector('.popup__image');
const imageDescription = popupImage.querySelector('.popup__description');


function fillCards(){
  const nameOnly = initialCards.map(addCard);
  photoGrid.append(...nameOnly);
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    const submitButtonSelector = popup.querySelector('.popup__button');
  if (submitButtonSelector) {
    toggleButtonState(inputList, submitButtonSelector);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

// Закртие попапа нажатием на оверлей и Esc
popupAll.forEach((popup) => {
  popup.addEventListener('click', evt => {
    if(evt.target.classList.contains('popup')){
      closePopup(popup);
    }
  })
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    };
}); 
});

// Форма редактирования автора
function openAuthorPopup(){
  // console.log(popupAuthorContainer);
  popupNameAuthor.value = profileEditAuthor.textContent;
  popupLinkAuthor.value = profileProfession.textContent;
  openPopup(popupAuthorContainer);

}

function handleAuthorFormSubmit (evt){
  evt.preventDefault();
  profileEditAuthor.textContent = popupNameAuthor.value;
  profileProfession.textContent = popupLinkAuthor.value;
  closePopup(popupAuthorContainer);
}

// Форма добавления изображения
function handleAddImageFormSubmit (evt){
  evt.preventDefault();
  const name = popupNameAddImage.value;
  const link = popupLinkAddImage.value;
  const nameList = addCard({name:name, link:link});
  photoGrid.prepend(nameList);
  popupNameAddImage.value = '';
  popupLinkAddImage.value = '';
  closePopup(popupAddImageContainer);
}

function addCard(item){
  const cards = photoTemplate.querySelector('.photo__card').cloneNode(true);
  const cardDescription = cards.querySelector('.photo__card-discprition');
  const cardPlace = cards.querySelector('.photo__card-place');
  cardDescription.textContent = item.name;
  cardPlace.src = item.link;
  cardPlace.alt = item.name;

  const deleteButton = cards.querySelector('.photo__delete-icon');
  deleteButton.addEventListener('click', deleteCard);

  cardPlace.addEventListener('click', () => openLargeImage(item.link, item.name));

  cards.querySelector('.photo__card-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo__card-like_active');
  });
  return cards; 
}

function deleteCard (evt){
  evt.target.closest('.photo__card').remove();
}

// Вывод увеличенной карточки
function openLargeImage(link, name){
  openPopup(popupImage);
  image.src = link;
  imageDescription.textContent = name;
}

fillCards();

clickEditButton.addEventListener('click', openAuthorPopup);
clickAuthorCloseButton.addEventListener('click', () => closePopup(popupAuthorContainer) );
formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

clickAddImageButton.addEventListener('click', () => openPopup(popupAddImageContainer));
clickAddImageCloseButton.addEventListener('click', () => closePopup(popupAddImageContainer));
formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);

closeImage.addEventListener('click', () => closePopup(popupImage));


