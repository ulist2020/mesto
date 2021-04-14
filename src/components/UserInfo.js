export default class UserInfo {
    constructor(author, profession, avatar) {
        this._author = author;
        this._profession = profession;
        this._avatar = avatar;
    }

    getUserInfo(){
        const result = {
            name: this._author.textContent,
            profession: this._profession.textContent,
            avatar: this._avatar.src
        }; 
        return result;
    }

    setUserInfo(userData){
        this._author.textContent = userData.name;
        this._profession.textContent = userData.about;
        this._avatar.src = userData.avatar;
    }
}