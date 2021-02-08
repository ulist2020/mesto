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

const popupAuthorContainer = document.querySelector('.popup-author');
const clickEditButton = document.querySelector('.profile__edit-button');
const clickAuthorCloseButton = document.querySelector('.popup-author__close-button');
const formAuthorElement = document.querySelector('.popup-author__container');
const profileEditAuthor = document.querySelector('.profile__edit-author');
const profileProfession = document.querySelector('.profile__profession');

const popupAddImageContainer = document.querySelector('.popup-addimage');
const clickAddImageButton = document.querySelector('.profile__button');
const clickAddImageCloseButton = document.querySelector('.popup-addimage__close-button');
const formAddImageElement = document.querySelector('.popup-addimage__container');

const popupImage = document.querySelector('.popup-image');
const closeImage = document.querySelector('.popup-image__close');


function fillCards(){
  const nameOnly = initialCards.map(addCard);
  photoGrid.append(...nameOnly);
}

// Форма редактирования автора
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
function openAddImagePopup(){
  popupAddImageContainer.classList.add('popup-addimage_opened');
}

function handleAddImageFormSubmit (evt){
  evt.preventDefault();
  const name = popupAddImageContainer.querySelector('.popup-addimage__image-name').value;
  const link = popupAddImageContainer.querySelector('.popup-addimage__image-link').value;
  const nameList = addCard({name:name, link:link});
  photoGrid.prepend(nameList);
  popupAddImageContainer.querySelector('.popup-addimage__image-name').value = '';
  popupAddImageContainer.querySelector('.popup-addimage__image-link').value = '';
  closeAddImagePopup();
}

function closeAddImagePopup(){
  popupAddImageContainer.classList.remove('popup-addimage_opened');
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
function openLargeImage(){
  popupImage.classList.add('popup-image_opened');
  const image = popupImage.querySelector('.popup-image__image');
  const imageDescription = popupImage.querySelector('.popup-image__description');
  
  image.src = this.src;
  imageDescription.textContent = this.parentNode.querySelector('.photo__card-discprition').textContent;
}

function closeLargeImage(){
  popupImage.classList.remove('popup-image_opened');
}

fillCards();

clickEditButton.addEventListener('click', openAuthorPopup);
clickAuthorCloseButton.addEventListener('click', closeAuthorPopup);
formAuthorElement.addEventListener('submit', handleAuthorFormSubmit);

clickAddImageButton.addEventListener('click', openAddImagePopup);
clickAddImageCloseButton.addEventListener('click', closeAddImagePopup);
formAddImageElement.addEventListener('submit', handleAddImageFormSubmit);

closeImage.addEventListener('click', closeLargeImage);
