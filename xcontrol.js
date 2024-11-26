const c_type = {
  'red': 'danger',
  'blue': 'primary',
  'green': 'success',
  'orange': 'warning',
  'light-blue': 'info',
  'light-black': 'secondary',
  'black': 'dark',
  'light': 'light',
  'white': 'default',
  'link': 'link',
  'basic': ''
};

const c_size = {
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
  'xs': 'xs'
};

class CIcon extends _I {
  constructor(ico = '') {
    super();
    this.setAttr({ class: `fa fa-${ico}` });
  }
}

class CFlex extends Panel {
  constructor(align = 'center', height = '') {
    super();

    this.setStyle({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align,
      alignItems: align,
      height: height
    });
  }
}

class CScreen extends Panel {
  constructor() {
    super();

    this.setStyle({
      width: '100%',
      height: '100%',
      position: 'relative'
    });
  }
}

class CContainer extends Panel {
  constructor(fluid = true) {
    super();
    this.setAttr({
      class: fluid ? 'container-fluid' : 'container'
    });

  }
}

// button
class CButton extends Button {
  constructor(title = '', type = 'basic', size = 'sm') {
    super(title);

    if (typeof(c_type[type]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_type)}`);

    if (typeof(c_size[size]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_size)}`);

    this.setAttr({
      class: `btn btn-${c_type[type]} btn-${c_size[size]}`
    });

  }
}

// dropdown button
class CDropDown extends Panel {
  constructor(title = '', type = 'blue') {
    super();

    this.setAttr({
      class: 'dropdown'
    });

    const btn = new CButton(title, type);
    btn.add(new Empty().setStyle({
      marginLeft: '2px'
    }).setAttr({
      'class': 'caret'
    }));

    btn.setAttr({
      'data-toggle': 'dropdown',
      'aria-expanded': 'false'
    });

    super.add(btn);

    this.ul = new _Ul();
    this.ul.setAttr({
      class: 'dropdown-menu'
    });

    let toggle = false;

    btn.addEventListener('click', () => {
      toggle = !toggle;

      if (toggle) {
        this.addClass('open');
        btn.setAttr({
          'aria-expanded': 'true'
        });
      } else {
        this.removeClass('open');
        btn.setAttr({
          'aria-expanded': 'false'
        });
      }

    });
    

    this.add(this.ul);

  }

  add(title = '', fn = null) {
    const li = new _Li();

    const link = new Link().setStyle({
      cursor: 'pointer'
    });

    li.add(link);

    link.setHTML(title);
    this.ul.add(li);

    if (typeof(fn) == 'function') {
      li.addEventListener('click', () => {
        fn();
      });
    }
    return this;
  }
}

// button group

class CButtonGroup extends Panel {
  constructor(type = '', size = 'sm') {
    super();

    if (typeof(c_size[size]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_size)}`);

    this.setAttr({
      class: `btn-group btn-group-${c_size[size]} btn-group-${type}`
    });
  }
}

// alert
class CAlert extends Panel {
  constructor(htm = '', type = 'white') {
    super();

    if (typeof(c_type[type]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_type)}`);

    this.setHTML(`${htm}`);

    this.setAttr({
      class: `alert alert-${c_type[type]}`
    });

  }
}
// textfield

// badge
class CBadge extends Empty {
  constructor(htm) {
    super();

    this.setAttr({
      class: 'badge'
    });

    this.setHTML(htm);
  }
}

// label

class CLabel extends Empty {
  constructor(htm = '', type = 'white') {
    super();
    
    if (typeof(c_type[type]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_type)}`);

    this.setAttr({
      class: `label label-${c_type[type]}`
    });

    this.setHTML(htm);
  }
}

class CText extends Empty {
  constructor(title = '') {
    super();
    this.setHTML(title);
  }
}


// progressbar

class CProgressBar extends Panel {
  constructor(type = 'green') {
    super();

    if (typeof(c_type[type]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_type)}`);

    this.setAttr({
      class: `progress`
    });



    this.bar = new Panel();
    this.bar.setAttr({
      class: `progress-bar progress-bar-${c_type[type]} progress-bar-striped active`,
      role: 'progessbar'
    });

    this.add(this.bar);
  }

  setValue(value = 0, msg = '') {
    this.bar.setStyle({
      width: `${value}%`
    });
    if (msg != '') {
      this.bar.setHTML(`${value}% ${msg}`);
    }
    return this;
  }
}
// pagination
class CPagination extends _Ul {
  constructor(size = 'sm') {
    super();

    if (typeof(c_size[size]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_size)}`);

    this.setAttr({
      class: `pagination pagination-${c_size[size]}`
    });

    this.items = [];
  }
  clearActive() {
    for (const item of this.items) {
      item.removeClass('active');
    }
  }

  add(title, fn) {
    const link = new Link().setStyle({
      cursor: 'pointer'
    });
    link.setHTML(title);

    const li = new _Li();
    li.add(link);


    if (typeof(fn) == 'function') {
      li.addEventListener('click', () => {
        this.clearActive();
        li.addClass('active');
        fn(title);
      });
    }
    this.items.push(li);
    super.add(li);
    return this;
  }
}
// breadcrumb
class CBreadCrumb extends List {
  constructor() {
    super();

    this.setAttr({
      class: 'breadcrumb'
    });
  }

  add(title = '', fn = null) {
    const link = new Link();
    link.setHTML(title);

    this.addItem(link);
    if (typeof(fn) == 'function') {
      fn();
    }
    return this;
  }
}

// Panel 

class CPanel extends Panel {
  constructor(title = '', type = 'blue') {
  
    if (typeof(c_type[type]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_type)}`);
    
    super();

    const heading = new Panel();
    heading.setAttr({
      class: 'panel-heading'
    });
    heading.setHTML(title);

    this.panel_body = new Panel();
    this.panel_body.setAttr({
      class: 'panel-body'
    });

    super.add(heading);
    super.add(this.panel_body);

    this.setAttr({
      class: `panel panel-${c_type[type]}`
    });
  }

  add(obj) {
    this.panel_body.add(obj);
    return this;
  }


}


// 
class CDropDown2 extends _Li {
  constructor(title = '') {
    super();

    this.setAttr({
      class: 'dropdown'
    });

    const a = new Link().setAttr({
      class: 'dropdown-toggle',
      'data-toggle': 'dropdown'
    }).setHTML(title + ' <span class="caret"></span>').setStyle({
      cursor: 'pointer'
    });
    this.ul = new _Ul().setAttr({
      class: 'dropdown-menu'
    });

    let toggle = false;

    a.addEventListener('click', () => {
      toggle = !toggle;

      if (toggle) {
        this.ul.show();
      } else {
        this.ul.hide();
      }
    });

    super.add(a);
    super.add(this.ul);
  }

  add(title = '', fn = null) {
    const li = new _Li();

    const a = new Link().setHTML(title).setStyle({
      cursor: 'pointer'
    });

    li.add(a);

    if (typeof(fn) == 'function') {
      a.addEventListener('click', () => {
        fn();
      });
    }

    this.ul.add(li);

    return this;
  }
}

// navbar

class CAppBar extends Panel {
  constructor(title = '', right = false, inverse = false) {
    super();

    this.setAttr({
      class: `navbar navbar-${inverse ? 'inverse' : 'default'}`
    });

    const con = new CContainer().setStyle({ position: 'relative' });

    const header = new Panel().setAttr({
      class: 'navbar-header'
    });

    const brand = new Link().setAttr({
      class: 'navbar-brand'
    });

    brand.setHTML(title);

    header.add(brand);
    
    this.ul = new _Ul();
    this.ul.setAttr({
      class: `nav navbar-nav navbar-${right ? 'right' : ''}`
    });

    if (title != '') {
      con.add(header);
      con.add(this.ul);
    }

    this.con = con;
    super.add(con);
  }

  add(title = '', fn = null) {

    if (typeof(title) == 'string') {
      const li = new _Li();
      li.setStyle({
        cursor: 'pointer'
      })

      const a = new Link().setHTML(title);

      li.add(a);

      if (typeof(fn) == 'function') {
        a.addEventListener('click', () => {
          fn();
        });
      }

      this.ul.add(li);
    } 

    if (typeof(title) == 'object') {
      this.ul.add(title); 
    }

    return this;
  }

  action(obj) {
    if (obj instanceof Widget) {
      this.con.add(obj);
    }
  }

}

// textfield
class CTextField extends Panel {
  constructor(param, type = 'text', placeholder = '') {
    super();

    if (typeof(param) == 'string') {
      this.add(new CText(param).setStyle({
        letterSpacing: '2px',
        color: '#8d8d8d'
      }));
    }



    this.tf = new TextField();

    this.tf.setAttr({
      type: type
    });

    this.tf.setAttr({
      class: 'form-control',
      name: 'name',
      autocomplete: 'off',
      placeholder: placeholder
    });

    this.add(this.tf);
  }

  focus() {
    this.tf.control.focus();
  }

  value(v) {
    if (typeof(v) === "string") {
      this.tf.setValue(v);
      return this;
    }
    return this.tf.getValue();
  }

}

// combobox

class CComboBox extends Panel {

  constructor(param) {
    super();

    if (typeof(param) == 'string') {
      super.add(new CText(param).setStyle({
        letterSpacing: '2px',
        color: '#8d8d8d'
      }));
    }



    this.tf = new _Select();

    this.tf.setAttr({
      class: 'form-control',
      name: 'name'
    });

    super.add(this.tf);
  }

  add(key, value) {
    const option = new _Option();
    option.setAttr({
      value: key
    });
    option.setHTML(value);
    this.tf.add(option);

    return this;
  }

  value(v) {
    if (typeof(v) === "string") {
      this.tf.setValue(v);
      return this;
    }
    return this.tf.getValue();
  }
}

// textfield
class CTextBox extends Panel {
  constructor(param) {
    super();

    if (typeof(param) == 'string') {
      this.add(new CText(param).setStyle({
        letterSpacing: '2px',
        color: '#8d8d8d'
      }));
    }



    this.tf = new TextBox();

    this.tf.setAttr({
      class: 'form-control',
      name: 'name',
      autocomplete: 'off'
    });

    this.add(this.tf);
  }


  value(v) {
    if (typeof(v) === "string") {
      this.tf.setValue(v);
      return this;
    }
    return this.tf.getValue();
  }
}


class CTable extends Panel {
  constructor(param) {
    super();

    this.setAttr({
      class: 'table-responsive'
    });

    const tbl = new _Table().setAttr({
      class: `table`
    });

    if (typeof(param) == 'object') {
      const { header = [], border = false, striped = false } = param;

      tbl.setAttr({
        class: `table ${border ? 'table-bordered' : ''} ${striped ? 'table-striped' : ''}`
      });

      const tr = new _Tr();
      for (const item of header) {
        const th = new _Th();
        th.setHTML(item);
        tr.add(th);
      }
      const thead = new _Thead();
      thead.add(tr);

      tbl.add(thead);
    }

    this.tbody = new _Tbody();
    
    tbl.add(this.tbody);

    super.add(tbl);


    this.items = [];
  }

  removeItem(index) {
    this.items[index].delete();
    this.items.splice(index, 1);
  }

  add(items = null, styles = [], clazz = {}) {
    if (typeof(items) == 'object') {
      const tr = new _Tr();
      let i = 0;

      if (typeof(clazz['class']) != null) { 
        tr.addClass(clazz['class']);
        if (typeof(clazz['timeout']) != null) {
          setTimeout(() => {
            tr.removeClass(clazz['class']);
          }, clazz['timeout']);
        }
      }

      for (const item of items) {
        const td = new _Td();

        if (typeof(styles[i]) !== 'undefined') {
          td.setStyle(styles[i]);
        }
        
        if (typeof(item) == 'string') {
          td.setHTML(item);
        } else if (item instanceof Widget) {
          td.add(item);
        } else {
          throw new Error('Invalid table data must be string or widget');
        }

        tr.add(td);
        this.items.push(tr);

        ++i;
      }

      // if (typeof(fn) == 'function') {
      //   tr.addEventListener('click', () => {
      //     fn(tr);  
      //   });
      // }

      this.tbody.add(tr);
    }
    return this;
  }

}

/// table


// modal

class CDialog extends Panel {
  constructor(title = '', size = 'md', parent_obj = null) {
    if (typeof(c_size[size]) == 'undefined') throw new Error(`Error: available ${JSON.stringify(c_size)}`);

    super();

    this.resolve   = null;
    this.resolvefn = null;
    
    this.parent_obj = null;

    this.setAttr({
      class: 'modal fade',
      role: 'dialog'
    });
    
    const dialog = new Panel().setAttr({
      class: `modal-dialog modal-${c_size[size]}`
    });

    const content = new Panel().setAttr({
      class: 'modal-content'
    });

    const header = new Panel().setAttr({
      class: 'modal-header'
    });

    const h = new _H5().setAttr({
      class: 'modal-title'
    }); 

    h.setHTML(title);

    
    const close = new CButton('x', 'white').setAttr({
      class: 'close'
    });


    header.add(close);
    header.add(h);


    content.add(header);
    this.body_1 = new Panel().setAttr({
      class: 'modal-body'
    }).setStyle({
      overflowY: 'auto'
    });
    content.add(this.body_1);

    dialog.add(content);

    super.add(dialog);
    this.body.append(this.control);

    close.addEventListener('click', () => {
      
      if (this.parent_obj != null) {
        this.parent_obj.dispose();
      }

      this.hide();
      this.resolvefn(this.resolve);

    });

    // content.addEventListener('mousedown', () => {

    // });
  }

  init(parent_obj) {
    this.parent_obj = parent_obj;
  }

  add(item) {
    if (item instanceof Widget) {
      this.body_1.add(item);
    } else if (item instanceof Array) {
      for (const i of item) {
        this.body_1.add(i);
      }
    }

    return this;
  }

  setStyle(styles = {}) {
    this.body_1.setStyle(styles);
    return this;
  }

  show() {

    this.addClass(['modal', 'fade', 'in']);

    super.show();

    const promise = new Promise((resolve, reject) => {
      this.resolvefn = resolve;
    }); 
    
    return promise;
  }

  hide(resolve = null) {

    this.clear();
    this.delete();

    this.resolvefn(resolve);
  }

}

// Tab

class CTab extends Panel {
  constructor() {
    super();

    this.ul = new _Ul().setAttr({
      class: 'nav nav-tabs'
    });

    super.add(this.ul);

    this.content = new Panel().setAttr({
      class: 'tab-content'
    });

    super.add(this.content);

    this.items = [];
    this.contents = [];
  }

  clearContent() {
    for (const item of this.contents) {
      item.removeClass('in').removeClass('active');
    }
  }

  clear() {
    for (const item of this.items) {
      item.removeClass('active');
    }
  }

  add(h, fn) {
    const li = new _Li();
    const a = new Link().setStyle({
      cursor: 'pointer'
    });

    a.setHTML(h);

    li.add(a);

    const content = new Panel().setAttr({
      class: 'tab-pane fade'
    });

    // if (item instanceof Widget) {
    //   content.add(item);
    // }


    this.content.add(content);

    li.addEventListener('click', () => {
      this.clear();
      this.clearContent();
      li.addClass('active');
      content.addClass('in').addClass('active');
      if (typeof(fn) === "function") {
        content.clear();
        fn(content);
      }
    });
    

    this.ul.add(li);
    this.items.push(li);
    this.contents.push(content);
    return this;
  }

}


// column same with flutter

class CSizedBox extends Panel {
  constructor({
    width = 0,
    height = 0
  }) {

    super();

    this.setStyle({
      width: `${width}px`,
      height: `${height}px`
    });
  }
};

class CRow extends Panel {
  constructor(lists, align = 'left') {
    super();
      
    this.setStyle({
      position: 'relative',
      width: '100%'
    });

    if (lists instanceof Array) {
      for (const item of lists) {
        if (item instanceof Widget) {
          item.setStyle({
            float: align
          });
          this.add(item);
        }
      }
    }


  }


}
// same with flutter
class CColumn extends Panel {
  constructor(lists, align = 'left') {
    super();
      
    this.setStyle({
      position: 'relative',
      height: '100%'
    });

    if (lists instanceof Array) {
      for (const item of lists) {
        if (item instanceof Widget) {
          item.setStyle({
            display: 'block'
          });
          this.add(item);
        }
      }
    }


  }


}

class CPara extends _P {
  constructor(htm = '') {
    super();
    if (typeof(htm) == 'string') {
      this.setHTML(htm);
    }
  }
}


class CIntro extends Panel {
  constructor(title = '', content = '') {
    super();
    this.addClass('jumbotron');

    const h1 = new _H(1);
    h1.setHTML(title);

    this.add(h1);

    this.add(new CPara(content));

  }
}

class CGrid extends Panel {
  constructor() {
    super();
    this.addClass('row');
  }

  add(obj, sizes = []) {
    if (obj instanceof Widget) {
      for (const size of sizes) {
        if (typeof(size) == 'string') {
          obj.addClass(`col-${size}`);
        }
      }
      super.add(obj);
    } else {
      throw new Error('Invalid obj in Grid.addItem(obj, sizeds = [])');  
    }
    return this;
  }
}


class CDrawer extends Panel {
  constructor() {
    super();
      
    this.parent_obj = null;

    this.setStyle({
      'position': 'fixed',
      'top': '0',
      'left': '0',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      zIndex: '100'
    });

    this.side_bar = new Panel().setStyle({
      width: '400px',
      height: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      top: '0',
      left: '0',
      boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)'
    });

    this.side_bar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.addEventListener('click', (e) => {
      this.hide();
    });


    super.add(this.side_bar);
    this.body.appendChild(this.control);
    this.close();
  }

  init(parent_obj) {

    return this;
  }

  open() {
    
    this.show();
    return this;
  }

  close() {
    this.hide();
    return this;
  }
  
  drawerStyle(styles = {}) {
    this.side_bar.setStyle(styles);
    return this;
  }

  add(obj) {
    if (obj instanceof Widget) {
      this.side_bar.add(obj);
    }
    return this;
  }

}

class CTabContent extends Panel {
  constructor(param) {
    super();
    this.setStyle({
      width: '100%',
      minHeight: '50px',
      borderLeft: '1px solid #dddddd',
      borderRight: '1px solid #dddddd',
      borderBottom: '1px solid #dddddd'
    });


    if (param instanceof Widget) {
      this.add(param);
    } else if (param instanceof Array) {
      for (const item of param) {
        if (item instanceof Widget) {
          this.add(item);
        }
      }
    }

  }
}

class CForm extends _Form {
  constructor() {
    super();
  }

  add(obj) {
    super.add(obj);
    
    return this;
  }

}





/// material Button
class MButton extends Button {
  constructor(html) {
    super();
    // <!-- <button class="mdc-button mdc-button--raised">
    //   <span class="mdc-button__ripple"></span>
    //   <span class="mdc-button__focus-ring"></span>
    //   <span class="mdc-button__label">Contained Button</span>
    // </button>
    super.addClass(["mdc-button"]);
    const ripple = new Empty().addClass("mdc-button__ripple");
    const focus_ring = new Empty().addClass("mdc-button__focus-ring");
    this.label = new Empty().addClass("mmdc-button__label").setHTML(html);
    super.add([ ripple, focus_ring, this.label ]);
  }
  add(obj) {
    if (typeof(obj) === "string") {
      this.label.setHTML(obj);
    } else {
      this.label.add(obj);
    }
    return this;
  }
  setIcon(icon_txt) {
    super.addClass("mdc-button--icon-trailing");
    const icon = new _I();
    icon.addClass(["fa", `fa-${icon_txt}`, "mdc-button__icon"]).setStyle({
      marginLeft: "5px"
    });
    super.add(icon);
    return this;
  }
}

class MOutlinedButton extends MButton {
  constructor() {
    super();
    super.addClass("mdc-button--outlined");
  }
}

class MContainedButton extends MButton {
  constructor() {
    super();
    super.addClass("mdc-button--raised");
  }
}
// end material button


//Material textfield
class MTextField extends _Label {
  constructor(type = "text", hint = "") {
    super();
    // <label class="mdc-text-field mdc-text-field--filled">
    //   <span class="mdc-text-field__ripple"></span>
    //   <span class="mdc-floating-label" id="my-label-id">Hint text</span>
    //   <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
    //   <span class="mdc-line-ripple"></span>
    // </label>

    this.addClass(["mdc-text-field", "mdc-text-field--filled"]);
    const ripple = new Empty().addClass("mdc-text-field__ripple");
    const float = new Empty().addClass(["mdc-floating-label"]).setAttr("id", "").setHTML(hint);
    this.input = new TextField({type: type}).addClass("mdc-text-field__input").setAttr("my-label-id", "");
    const line_ripple = new Empty();
    
    this.add([
      ripple, float, this.input, line_ripple
    ]);

    this.tf = new mdc.textField.MDCTextField(this.control);
  }

  value(tf = null) {
    if (tf != null) {
      this.tf.value = tf;
    } 
    return this.tf.value;
  }
}

class MOutlinedTextField extends _Label {
  constructor(type = "text", hint = "") {
    super();
    this.addClass(["mdc-text-field", "mdc-text-field--outlined"]);
    const not_outline = new Empty().addClass("mdc-notched-outline");
    const leading = new Empty().addClass("mdc-notched-outline__leading");
    
    const notch = new Empty().addClass("mdc-notched-outline__notch");
    
    const notch_sub = new Empty().addClass("mdc-floating-label");
    
    notch_sub.setHTML(hint);
    
    notch.add(notch_sub);
    
    const trailing = new Empty().addClass("mdc-notched-outline__trailing");
    // leading.add(trailing);


    not_outline.add([leading, notch, trailing]);

    const input = new TextField({type: type}).addClass("mdc-text-field__input");

    this.add([
      not_outline, input
    ]);

    this.tf = new mdc.textField.MDCTextField(this.control);
  }

  value(tf = null) {
    if (tf != null) {
      this.tf.value = tf;
    } 
    return this.tf.value;
  }
  
}


class MTextBox extends _Label {
  constructor() {

    
    supper();
  }
}


class MSlider extends Panel {

  constructor(value = 0, step = 1, min = 0, max = 100) {
    super();
    this.addClass(["mdc-slider"]);
    const track = new Panel().addClass("mdc-slider__track")
          .add([
            new Panel().addClass("mdc-slider__track--inactive"),
            new Panel().addClass("mdc-slider__track--active")
              .add(new Panel().addClass("mdc-slider__track--active_fill"))
          ]);


    const thumb = new Panel().addClass("mdc-slider__thumb");
   
        
    thumb.add(new Panel().addClass("mdc-slider__thumb-knob"));
    
    this.input = new TextField({type: "range"})
                .setAttr("min", min)
                .setAttr("max", max)
                .setAttr("value", value)
                .setAttr("step", step)
                .setAttr("name", "volume")
                .setAttr("aria-label", "Testing")
                .addClass("mdc-slider__input");
    
    thumb.add(this.input);
    
                
    
    this.add([track, thumb]);
    
    this.slider = null;
    setTimeout(() => {
      this.slider = new mdc.slider.MDCSlider(this.control);
    }, 100);


  }

  value(value = null) {
    if(value != null) {
      this.input.setValue(value);
    }
    return this.input.getValue();
  }
}

class MSwitch extends Empty {
  constructor() {
    super();
    const button = new Button()
                  .addClass(["mdc-switch", "mdc-switch--unselected"])
                  .setAttr("type", "button")
                  .setAttr("role", "switch")
                  .setAttr("aria-checked", "false");
    button.add(
            new Panel().addClass("mdc-switch__track")
          )
          .add(
            new Panel()                .addClass("mdc-switch__handle-track")
                       .add(new Panel().addClass("mdc-switch__shadow").add(new Panel().addClass("mdc-elevation-overlay")))
                       .add(new Panel().addClass("mdc-switch__ripple"))
                       .add(new Panel().addClass("mdc-switch__icons")
                                       .add(new Svg().addClass(["mdc-switch__icon", "mdc-switch__icon--on"]).setAttr("viewBox", "0 0 24 24").add(new Path().setAttr("d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z")))
                                       .add(new Svg().addClass(["mdc-switch__icon", "mdc-switch__icon--off"]).setAttr("viewBox", "0 0 24 24").add(new Path().setAttr("d", "M20 13H4v-2h16v2z")))              
                        )
                        // .add(new Panel().addClass("mdc-switch__icons")
                        //                .add(new Svg().addClass(["mdc-switch__icon", "mdc-switch__icon--on"]).setAttr("viewBox", "0 0 24 24").add(new Path().setAttr("d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z")))
                        //                .add(new Svg().addClass(["mdc-switch__icon", "mdc-switch__icon--off"]).setAttr("viewBox", "0 0 24 24").add(new Path().setAttr("d", "M20 13H4v-2h16v2z")))              
                        // )
          )
          .add(
            new Empty().addClass("mdc-switch__focus-ring-wrapper").add(new Panel().addClass("mdc-switch__focus-ring"))
          );

    this.add(button);
    this.add(new _Label().setHTML("off/on"));

    this.tf = new mdc.switchControl.MDCSwitch(button.control);

  }

  value(value = null) {
    if (value != null) {
      this.tf.selected = value;
    }
    return this.tf.selected;
  }

  onChange(fn) {
    this.tf.root.addEventListener("click", () => {
      fn(this.tf.selected);
    });
  }
}

export {
  MButton,
  MOutlinedButton,
  MContainedButton
};


export {
  MTextField,
  MOutlinedTextField,
  MTextBox
};

export {
  MSlider
}

export {
  MSwitch
}




// font awesome
export { 
  CIcon, 
  CFlex, 
  CScreen, 
  CContainer, 
  CButton, 
  CDropDown, 
  CButtonGroup, 
  CAlert, 
  CBadge, 
  CLabel, 
  CText, 
  CProgressBar, 
  CPagination, 
  CBreadCrumb, 
  CPanel, 
  CDropDown2,
  CAppBar, 
  CTextField, 
  CTextBox, 
  CTable, 
  CDialog, 
  CTab, 
  CTabContent,
  CRow, 
  CColumn,
  CSizedBox,
  CPara,
  CIntro,
  CComboBox,
  CGrid,
  CDrawer,
  CForm
};
