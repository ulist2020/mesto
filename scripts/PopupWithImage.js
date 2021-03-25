import Popup from './Popup.js';
import { image, imageDescription } from './index.js';

export default class PopupWithImage extends Popup {
	    constructor(name, link, containerSelector) {
        super(containerSelector);
        this._name = name;
        this._link = link;
        }

        open(){
            super.open();
            image.src = this._link;
            imageDescription.textContent = this._name;
        }
}
    
