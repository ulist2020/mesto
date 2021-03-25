
export default class UserInfo {
    constructor(author, profession, authornew, professionnew ) {
        this._author = author;
        this._profession = profession;
        this._authornew = authornew;
        this._professionnew = professionnew;
    }

    getUserInfo(){
        this._authornew.value = this._author.textContent;
        this._professionnew.value = this._profession.textContent;
    }

    setUserInfo(){
        this._author.textContent = this._authornew.value;
        this._profession.textContent = this._professionnew.value;
    }
}