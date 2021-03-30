import { popupNameAuthor, popupLinkAuthor } from '../scripts/constants.js';

export default class UserInfo {
    constructor(author, profession) {
        this._author = author;
        this._profession = profession;
    }

    getUserInfo(){
        popupNameAuthor.value = this._author.textContent;
        popupLinkAuthor.value = this._profession.textContent;
    }

    setUserInfo(){
        this._author.textContent = popupNameAuthor.value;
        this._profession.textContent = popupLinkAuthor.value;
    }
}