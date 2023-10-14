export default class Section{
  constructor({items, renderer}, containerSelector ){
     this._items = items;
     this._renderer = renderer;
     this._container = document.querySelector(containerSelector);
  }
  renderItems(){
      //public method that renders all elements on the page,
     this._items.forEach((item) => {
       this._renderer(item);
     });
  }
  addItem(item)
  {
   this._container.prepend(item);
  };
}