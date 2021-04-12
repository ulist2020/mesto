export default class UserInfo {
    constructor(author, profession, popupNameAuthor, popupLinkAuthor) {
        this._author = author;
        this._profession = profession;
        this._popupNameAuthor = popupNameAuthor;
        this._popupLinkAuthor = popupLinkAuthor;
    }

    getUserInfo(){
        const result = {
            name: this._author.textContent,
            profession: this._profession.textContent
        }; 
        return result;
    }

    setUserInfo(){
        this._author.textContent = this._popupNameAuthor.value;
        this._profession.textContent = this._popupLinkAuthor.value;
    }
}