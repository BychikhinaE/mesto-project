//Свойство items — это массив данных, которые нужно добавить на страницу
//при инициализации класса. Вы получаете эти данные от Api

export default class Section {
  constructor({items, renderer}, containerSelector){
    this._initialArray  = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
//Публичный метод, который отвечает за отрисовку всех элементов.
  renderItems() {
    console.log('renderItems')
  this._initialArray.forEach(item =>
    this._renderer(item));
  }

//Публичный метод addItem принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    console.log('addItem')
  this._container.prepend(element);
  }
}
