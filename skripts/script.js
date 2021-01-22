
let clickEditButton = document.querySelector('.profile__edit-button');
let popupWindow = document.querySelector('.popup');
let profileEditAuthor = document.querySelector('.profile__edit-author');
let popupAuthorName = document.querySelector('.popup__author-name');
let profileProfession = document.querySelector('.profile__profession');
let popupAuthorProfession = document.querySelector('.popup__author-profession');

let formElement = document.querySelector('.popup__container');

let clickCloseButton = document.querySelector('.popup__close-button');

function openPopup(){
    popupAuthorName.value = profileEditAuthor.textContent;
    popupAuthorProfession.value = profileProfession.textContent;
    popupWindow.classList.add('popup_opened');
}

function handleFormSubmit (evt){
    evt.preventDefault();
    profileEditAuthor.textContent = popupAuthorName.value;
    profileProfession.textContent = popupAuthorProfession.value;
    popupWindow.classList.remove('popup_opened');
}

function closePopup(){
    popupWindow.classList.remove('popup_opened');
}

clickEditButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', handleFormSubmit);
clickCloseButton.addEventListener('click', closePopup);