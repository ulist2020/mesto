
let clickEditButton = document.querySelector('.profile__edit-button');
let popupWindow = document.querySelector('.popup');
let profileEditAutor = document.querySelector('.profile__edit-autor');
let popupAutorName = document.querySelector('.popup__autor-name');
let profileProfession = document.querySelector('.profile__profession');
let popupAutorProfession = document.querySelector('.popup__autor-profession');

let formElement = document.querySelector('.popup__container');

let clickCloseButton = document.querySelector('.popup__close-button');

function openPopup(){
    popupWindow.classList.add('popup_opened');
    popupAutorName.value = profileEditAutor.textContent;
    popupAutorProfession.value = profileProfession.textContent;
}

function handleFormSubmit (evt){
    evt.preventDefault();
    profileEditAutor.textContent = popupAutorName.value;
    profileProfession.textContent = popupAutorProfession.value;
    popupWindow.classList.remove('popup_opened');
}

function closePopup(){
    popupWindow.classList.remove('popup_opened');
}

clickEditButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', handleFormSubmit);
clickCloseButton.addEventListener('click', closePopup);