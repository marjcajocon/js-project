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

    this.add(btn);

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

  addItem(title = '', fn = null) {
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

  addItem(title, fn) {
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
    this.add(li);
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

  addPage(title = '', fn = null) {
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

    this.add(heading);
    this.add(this.panel_body);

    this.setAttr({
      class: `panel panel-${c_type[type]}`
    });
  }

  addItem(obj) {
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

    this.add(a);
    this.add(this.ul);
  }

  addItem(title = '', fn = null) {
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
    this.add(con);
  }

  addItem(title = '', fn = null) {

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

  getText() {
    return this.tf.getValue();
  }

  setText(v) {
    this.tf.setValue(v);
    return this;
  }
}

// combobox

class CComboBox extends Panel {

  constructor(param) {
    super();

    if (typeof(param) == 'string') {
      this.add(new CText(param).setStyle({
        letterSpacing: '2px',
        color: '#8d8d8d'
      }));
    }



    this.tf = new _Select();

    this.tf.setAttr({
      class: 'form-control',
      name: 'name'
    });

    this.add(this.tf);
  }

  addItem(key, value) {
    const option = new _Option();
    option.setAttr({
      value: key
    });
    option.setHTML(value);
    this.tf.add(option);

    return this;
  }

  getText() {
    return this.tf.getValue();
  }

  setText(v) {
    this.tf.setValue(v);
    return this;
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

  getText() {
    return this.tf.getValue();
  }

  setText(v) {
    this.tf.setValue();
    return this;
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

    this.add(tbl);


    this.items = [];
  }

  removeItem(index) {
    this.items[index].delete();
    this.items.splice(index, 1);
  }

  addItem(items = null, styles = [], clazz = {}) {
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

    this.add(dialog);
    this.body.append(this.control);

    close.addEventListener('click', () => {
      
      if (this.parent_obj != null) {
        this.parent_obj.dispose();
      }

      this.close();

    });

    // content.addEventListener('mousedown', () => {

    // });
  }

  init(parent_obj) {
    this.parent_obj = parent_obj;
  }

  addItem(item) {
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

  open() {

    this.addClass(['modal', 'fade', 'in']);

    this.show();
  }

  close() {
    this.clear();
    this.delete();
  }

}

// Tab

class CTab extends Panel {
  constructor() {
    super();

    this.ul = new _Ul().setAttr({
      class: 'nav nav-tabs'
    });

    this.add(this.ul);

    this.content = new Panel().setAttr({
      class: 'tab-content'
    });

    this.add(this.content);

    this.items = [];
    this.contents = [];
  }

  clearContent() {
    for (const item of this.contents) {
      item.removeClass('in').removeClass('active');
    }
  }

  clearItem() {
    for (const item of this.items) {
      item.removeClass('active');
    }
  }

  addItem(h, item) {
    const li = new _Li();
    const a = new Link().setStyle({
      cursor: 'pointer'
    });

    a.setHTML(h);

    li.add(a);

    const content = new Panel().setAttr({
      class: 'tab-pane fade'
    });

    if (item instanceof Widget) {
      content.add(item);
    }


    this.content.add(content);

    li.addEventListener('click', () => {
      this.clearItem();
      this.clearContent();
      li.addClass('active');
      content.addClass('in').addClass('active');

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

  addItem(obj, sizes = []) {
    if (obj instanceof Widget) {
      for (const size of sizes) {
        if (typeof(size) == 'string') {
          obj.addClass(`col-${size}`);
        }
      }
      this.add(obj);
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


    this.add(this.side_bar);
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

  addItem(obj) {
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
