
export default class UserInfo {
    constructor(author, profession) {
        this._author = author;
        this._profession = profession;
    }

    getUserInfo(){
        this._author.value = document.querySelector('.profile__edit-author').textContent;
        this._profession.value = document.querySelector('.profile__profession').textContent;
    }

    setUserInfo(){
        document.querySelector('.profile__edit-author').textContent = this._author.value;
        document.querySelector('.profile__profession').textContent = this._profession.value;
    }
}