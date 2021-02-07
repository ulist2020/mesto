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

fillCards();

function fillCards(){
  const nameOnly = initialCards.map(CardAdd);
  photoGrid.append(...nameOnly);
}


// Форма редактирования автора
const popupAuthorContainer = document.querySelector('.popup-author');
let clickEditButton = document.querySelector('.profile__edit-button');
clickEditButton.addEventListener('click', openAuthorPopup);
let clickAuthorCloseButton = document.querySelector('.popup-author__close-button');
clickAuthorCloseButton.addEventListener('click', closeAuthorPopup);
let formAuthorElement = document.querySelector('.popup-author__container');
formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

let profileEditAuthor = document.querySelector('.profile__edit-author');
let profileProfession = document.querySelector('.profile__profession');

function openAuthorPopup(){
    popupAuthorContainer.classList.add('popup-author_opened');
    popupAuthorContainer.querySelector('.popup-author__author-name').value = profileEditAuthor.textContent;
    popupAuthorContainer.querySelector('.popup-author__author-profession').value = profileProfession.textContent;
}

function handleAuthorFormSubmit (evt){
  evt.preventDefault();
  profileEditAuthor.textContent = popupAuthorContainer.querySelector('.popup-author__author-name').value;
  profileProfession.textContent = popupAuthorContainer.querySelector('.popup-author__author-profession').value;
  closeAuthorPopup();
}

function closeAuthorPopup(){
  popupAuthorContainer.classList.remove('popup-author_opened');
}

// Форма добавления изображения
const popupAddImageContainer = document.querySelector('.popup-addimage');
let clickAddImageButton = document.querySelector('.profile__button');
clickAddImageButton.addEventListener('click', openAddImagePopup);
let clickAddImageCloseButton = document.querySelector('.popup-addimage__close-button');
clickAddImageCloseButton.addEventListener('click', closeAddImagePopup);
let formAddImageElement = document.querySelector('.popup-addimage__container');
formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);

function openAddImagePopup(){
  popupAddImageContainer.classList.add('popup-addimage_opened');
}

function handleAddImageFormSubmit (evt){
  evt.preventDefault();
  const name = popupAddImageContainer.querySelector('.popup-addimage__image-name').value;
  const link = popupAddImageContainer.querySelector('.popup-addimage__image-link').value;
  const nameList = CardAdd({name:name, link:link});
  photoGrid.prepend(nameList);
  popupAddImageContainer.querySelector('.popup-addimage__image-name').value = '';
  popupAddImageContainer.querySelector('.popup-addimage__image-link').value = '';
  closeAddImagePopup();
}

function closeAddImagePopup(){
  popupAddImageContainer.classList.remove('popup-addimage_opened');
}

function CardAdd(item){
  const cards = photoTemplate.querySelector('.photo__card').cloneNode(true);
  const cardDescription = cards.querySelector('.photo__card-discprition');
  const cardPlace = cards.querySelector('.photo__card-place');
  cardDescription.textContent = item.name;
  cardPlace.src = item.link;
  cardPlace.alt = item.name;

  const deleteButton = cards.querySelector('.photo__delete-icon');
  deleteButton.addEventListener('click', deleteCard);

  cards.querySelector('.photo__card-place').addEventListener('click', openLargeImage);

  cards.querySelector('.photo__card-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo__card-like_active');
  });
  return cards; 
}

function deleteCard (evt){
  const targetEl = evt.target;
  const targetItem = targetEl.closest('.photo__card');
  targetItem.remove();
}


// Вывод увеличенной карточки
const popupImage = document.querySelector('.popup-image');

function openLargeImage(){
  popupImage.classList.add('popup-image_opened');
  const image = popupImage.querySelector('.popup-image__image');
  const imageDescription = popupImage.querySelector('.popup-image__description');
  
  image.src = this.src;
  imageDescription.textContent = this.parentNode.querySelector('.photo__card-discprition').textContent;
}

const closeImage = document.querySelector('.popup-image__close');
closeImage.addEventListener('click', closeLargeImage);

function closeLargeImage(){
  popupImage.classList.remove('popup-image_opened');
}


