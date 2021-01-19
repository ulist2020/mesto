// Нажимаем кнопку редактировать
let profile_edit_button = document.querySelector('.profile__edit-button');

function showClick() {
    // 1. Открываем попап
    let popup_window = document.querySelector('.popup');
    popup_window.className = 'popup popup_opened';
    // 2. Поставляем данные из profile__edit-autor и profile__profession в два поля попапа
    let profile_edit_autor = document.querySelector('.profile__edit-autor');
    let popup_autor_name = document.querySelector('.popup__autor-name');
    popup_autor_name.value = profile_edit_autor.textContent;
    let profile_profession = document.querySelector('.profile__profession');
    let popup_autor_profession = document.querySelector('.popup__autor-profession');
    popup_autor_profession.value = profile_profession.textContent; 
}

profile_edit_button.addEventListener('click', showClick);
 
// При нажатии кнопки попапа Сохранить
// 1. Меняется текст в profile__edit-autor и profile__profession
let formElement = document.querySelector('.popup__container');
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let popup_autor_name = document.querySelector('.popup__autor-name');
    let popup_autor_profession = document.querySelector('.popup__autor-profession');

    // Выберите элементы, куда должны быть вставлены значения полей
    let profile_edit_autor = document.querySelector('.profile__edit-autor');
    let profile_profession = document.querySelector('.profile__profession');

    // Вставьте новые значения с помощью textContent
    profile_edit_autor.textContent = popup_autor_name.value;
    profile_profession.textContent = popup_autor_profession.value;

    // 2. Закрываем попап
    let popup_window = document.querySelector('.popup');
    popup_window.className = 'popup';
}

formElement.addEventListener('submit', handleFormSubmit);

// При нажатии кнопки попапа Закрыть
let popup_close_button = document.querySelector('.popup__close-button');

function closeClick() {
    // 1. Зактываем попап
    let popup_window = document.querySelector('.popup');
    popup_window.className='popup';
}

popup_close_button.addEventListener('click', closeClick);

//Реакция на клик по лайку:
// 1. Всем элементам задаем функцию на клик
// 2. Если элемент еще не лайкнут, то лайкаем. Если элемент уже залайкан, то отменяем лайк.
let foto_card_like_elements = document.querySelectorAll('.foto__card-like');
for (var i=0;i<foto_card_like_elements.length;i++){
    foto_card_like_elements[i].addEventListener('click', activClick);
}
function activClick(){
    if (this.className=='foto__card-like') {
        this.className='foto__card-like foto__card-like_active';
    } else {
        this.className='foto__card-like';
    }
    console.log('Установлен класс: ' + this.className);

}


