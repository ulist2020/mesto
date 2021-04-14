//Отвечает за отрисовку элементов на странице
export default class Section {
    constructor({ renderer }, containerSelector) {
      //this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    renderItems(items) {
      items.forEach(item => this._renderer(item))
    }
  
    addItem(element) {
      this._container.append(element);
    }

    prepend(element){
      this._container.prepend(element);
    }
  }