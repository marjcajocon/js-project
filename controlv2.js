class Widget {

  constructor(h) {
    this.control = document.createElement(h);
    this.body = document.body;

  }

  clear() {
    
    while (this.control.firstChild) {
      
      this.control.firstChild.remove();
      
    }

    return this;
  }

  setStyle(styles = {}) {

    for (const item in styles) {
      this.control.style[item] = styles[item];
    }

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

  add(widget) {
    this.control.appendChild(widget.control);
    return this;
  }

  addEventListener(evt, fn) {
    this.control.addEventListener(evt, fn);

    return this;
  }
}

// Text 
class Text extends Widget {
  constructor(param = '') {

    super('label');
    if (typeof(param) == 'string') {
      this.control.innerHTML = param;
    }

    if (typeof(param) != 'object') return;


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
  constructor() {
    super('input');

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


class List extends Widget {
  constructor() {
    super('ul');

  }
}

// Window
class Window extends Widget {
  constructor({ app = null, title = '', width = null, height = null }) {
    super('div');

    this.hide();
    this.body.appendChild(this.control);
  }
  run() {
    this.show();
  }
}
