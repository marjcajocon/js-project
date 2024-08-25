class Widget {

  constructor(h) {
    this.control = document.createElement(h);
    this.body = document.body;

    this.widgets = [];
  }

  clear() {
    while (this.control.firstChild) {
      
      this.control.firstChild.remove();
      
    }

    for (const item of this.widgets) {
      if (typeof(item.dispose) == 'function') {
        item.dispose();
      }

      item.clear();
    }

    return this;
  }

  remove(index = 0) {

    if (typeof(this.widgets[index]) != 'undefined') {
      this.widgets[index].control.remove();
    }

    this.widgets.splice(index, 1);
  }

  delete() {
    this.control.remove();
  }

  setStyle(styles = {}) {

    for (const item in styles) {
      this.control.style[item] = styles[item];
    }

    return this;
  }

  addClass(cs) {
    this.control.classList.add(cs);
    return this;
  }

  removeClass(cs) {
    this.control.classList.remove(cs);
    return this;
  }

  setAttr(attrs = {}) {
    for (const item in attrs) {
      this.control.setAttribute(item, attrs[item]);
    }
    return this;    
  }

  setValue(v) {
    this.control.value = v
    return this;
  }

  getValue() {
    return this.control.value;
  }

  show() {
    this.control.style.display = 'inline-block';
    return this;
  }

  hide() {
    this.control.style.display = 'none';
    return this;
  }

  setHTML(html) {
    this.control.innerHTML = html;
    return this;
  }

  add(widget) {
    this.widgets.push(widget);

    this.control.appendChild(widget.control);
    return this;
  }

  addEventListener(evt, fn) {
    this.control.addEventListener(evt, fn);

    return this;
  }
}

// Empty
class Empty extends Widget {
  constructor() {
    super('span');
    

  }
}

// Panel

class Panel extends Widget {
  constructor() {
    super('div');


  }
}

// Text 
class Text extends Widget {
  constructor(param = '') {

    super('span');
    if (typeof(param) == 'string') {
      this.control.innerHTML = param;
    }

    if (typeof(param) != 'object') return;


  }
}


// Link

class Link extends Widget {
  constructor() {
    super('a');
  }
}

// Button

class Button extends Widget {
  constructor(param) {
    super('button', param);

    if (typeof(param) == 'string') {
      this.add(new Text(param));
    }
    

    
    if (typeof(param) != 'object') return;
    
    const { title = '', widgets = [] } = param; // default param

    this.add(new Text(title));

    for (const widget of widgets) {
      this.add(widget);
    }

  }
}

// TextField 

class TextField extends Widget {
  constructor(param) {
    super('input');
    if (typeof(param) != 'object') return;

    const { type } = param;
    this.setAttr({
      type: type
    });
  }
}

// TextBox

class TextBox extends Widget {
  constructor() {
    super('textarea');

  }
}

// Fieldset

class Legend extends Widget {
  constructor(param = '') {
    super('legend');
    if (typeof(param) == 'string') {
      this.add(new Text(param));
    }

  }
}

class FieldSet extends Widget {
  constructor(param = 'str') {
    super('fieldset');
    if (typeof(param) == 'string') {
      this.add(new Legend(param));
    }

  }
}


class _Li extends Widget {
  constructor() {
    super('li');
  }
}

class _Ul extends Widget {
  constructor() {
    super('ul');
  }
}

class List extends Widget {
  constructor() {
    super('ul');
  }

  addItem(obj) {
    const li = new _Li();
    li.add(obj);
    this.add(li);
    return this;
  }
}

// Table tr thead, td, 

class _Table extends Widget {
  constructor() {
    super('table');
  }
}

class _Thead extends Widget {
  constructor() {
    super('thead');
  }
}

class _Tr extends Widget {
  constructor() {
    super('tr');
  }
}

class _Th extends Widget {
  constructor() {
    super('th');
  }
}

class _Td extends Widget {
  constructor() {
    super('td');
  }
}

class _Tbody extends Widget {
  constructor() {
    super('tbody');
  }
}

class _Tfoot extends Widget {
  constructor() {
    super('tfoot');
  }
}
// end of Table
  
// h

class _H5 extends Widget {
  constructor() {
    super('h5');
  }
}

class _I extends Widget {
  constructor() {
    super('i');
  }
}

// Window
class Window extends Widget {
  constructor(param) {
    super('div');
    this.setStyle({
      width: '100%',
      height: '100%',
      position: 'relative'
    });
    if (typeof(param) == 'object') {
      const { app = null, title = '', width = null, height = null } = param;
    }
    this.hide();
    this.body.appendChild(this.control);
  }

  navigate(obj) {
    this.clear();
    this.add(obj);
  } 

  run() {
    this.show();
  }
}
