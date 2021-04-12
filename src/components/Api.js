export class Api {
    constructor({address, token, format}) {
        this._address = address;
        this._token = token;
        this._format = format;
    }

    //Загрузка информации о пользователе с сервера
    getUserInfo(){
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': this._format
            }
        })
        .then(this._checkResponse)
    }

    //Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': this._format
            }
        })
        .then(this._checkResponse)
    }

    //Редактирование профиля
    editUser(data){
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': this._format
            },
            body: JSON.stringify({
                name: data.author,
                about: data.profession
            })
    })
    .then(this._checkResponse)

    }

    //Редактирование аватара
    editAvatar(data){
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': this._format
            },
            body: JSON.stringify({
                avatar: data
            })
    })
    .then(this._checkResponse)

    }

    //Добавление новой карточки
    addCard(data){
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': this._format
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
    })
    .then(this._checkResponse)
}

    //Удаление карточки
    deleteCard(id){
        return fetch(`${this._address}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': this._format
                },
        })
        .then(this._checkResponse)
        
    }

    //Добавление лайка
    addLike(id){
        return fetch(`${this._address}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token,
                    'Content-Type': this._format
                },
        })
        .then(this._checkResponse)
    }

    //Удаление лайка
    removeLike(id){
        return fetch(`${this._address}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': this._format
                },
        })
        .then(this._checkResponse)

    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

}

    
 

