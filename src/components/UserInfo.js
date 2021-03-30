import { popupNameAuthor, popupLinkAuthor } from '../scripts/constants.js';

export default class UserInfo {
    constructor(author, profession) {
        this._author = author;
        this._profession = profession;
    }

    getUserInfo(){
        const result = {
            name: this._author.textContent,
            profession: this._profession.textContent
        }; 
        return result;
    }

    setUserInfo(){
        this._author.textContent = popupNameAuthor.value;
        this._profession.textContent = popupLinkAuthor.value;
    }
}