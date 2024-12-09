import { b, center, hr, iframe, img, td, thead, tr } from "./core.js";
import { button, div, i, label, li, p, span, ul, Widget, a, select, option, input, table, tbody, th } from "./core.js";
export class InlinePanel extends span {
  constructor() {
    super();
  }
}
export class ListGroup extends ul {
  constructor() {
    super();   
  }
}
export class ListGroupItem extends li {
  constructor() {
    super();
  }
}
export class Link extends a {
  constructor() {
    super();
  }
}
export class Header extends Widget {
  constructor(variant) {
    super(variant);
  }
}
export class Divider extends hr {
  constructor() {
    super();
  }
}
export class Image extends img {
  constructor() {
    super();
  }
}
export class Container extends div {
  constructor() {
    super();
    this.class("container-fluid");
  }
}
export class NavBar extends Widget {
  constructor(title = null, logo = null, ids = "", color = "success", fn = null) {
    super("nav");
    this.class(["navbar", "navbar-expand-sm", `bg-${color}`, `navbar-dark`, "fixed-top"]); // fixed-top
    this.ids = ids;
    const container_fluid = new div().class("container-fluid");
    let brand = new a().class("navbar-brand");
    if (logo != null) {
      brand.add(new img().attr({
        src: logo, style: "width: 50px;", class: "rounded-pill"
      }));
    } 
    if ( title != null ) {
      brand.add(new span().html(title));
    }
    container_fluid.add(brand);
    const colapsed_btn = new button().class("c-toggle").add(new span().class("navbar-toggler-icon")).style({
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      height: "40px",
      width: "40px",
      position: "absolute",
      right: "10px",
      top: "15px"
    });
    let show = true;
    colapsed_btn.action("click", () => {
      if (fn != null) { fn(show); show = !show;}
    });
    const colapsed_con = new div();
    this.nav = new ul().class("navbar-nav");
    colapsed_con.add(this.nav);
    container_fluid.add([
      colapsed_btn,
      colapsed_con
    ]);
    super.add([
      container_fluid
    ]);
  }
  addMenu(link, fn) {
    const item = new li().class("nav-item").add(new a().class("nav-link").html(link).attr("href", "#"));
    this.nav.add(item);
    return this;
  }
}
export class Grid extends Widget {
  constructor(pad = 0) {
    super("div"); // Call the parent class's constructor if necessary
    this.addClass("row");
    this.panel = this;
    this.pad = pad;
    this._c = this.panel._c; // Store the inner container reference
  }
  cell(obj, size) {
    if (!(size instanceof Array)) {
      throw new TypeError('size must be an array or list'); // Check if size is an array
    }
    const td = new Panel(); // Create a new panel for the cell
    for (let x of size) {
      td.addClass(`col-${x}`); // Add column class based on size
      if (this.pad !== -1) {
        td.setStyle({
          padding: `${this.pad}px` // Set padding
        });
      }
    }
    td.add(obj); // Add the object to the cell
    this.panel.add(td); // Add the cell to the main panel
    return this; // Allow for method chaining
  }
}
export class Application extends Widget {
  constructor() {
    super("div"); // Call the parent class's constructor if necessary
    this.body = document.getElementsByTagName("body")[0];
    this._c = this.control;
    this.body.appendChild(this._c);
    this._c.style.width = "100%";
    this._c.style.height = "100%";
    this._c.style.margin = "0px";
    this._c.style.padding = "0px";
    this._c.style.position = "relative";

  }
  open(panel) {
    this.clear();
    this.add(panel);
    return this;
  }
  add(obj) {
    super.add(obj);
    return this;
  }
  route(widget) {
    this.clear();
    this.add(widget);
    return this;
  }
}
class Table2 extends table {
  constructor(header = [], th_bg = "success") {
    super();
    this.class("table");
    const _thead = new thead().class(`table-${th_bg}`);
    const _tr = new tr();
    for (const item of header) {
      const _th = new th().html(item);
      _tr.add(_th);
    }
    _thead.add(_tr);
    this.tbody = new tbody();
    super.add([ _thead, this.tbody ]);
  }
  prepend() {

  }
  add(values = []) {
    const _tr = new tr();
    for (const item of values) {
      const _td = new td();
      if (typeof(item) == "string") {
        _td.text(item);
      } else if(item instanceof Widget) {
        _td.add(item);
      } else {
        _td.text(`${item}`);
      }
      _tr.add(_td);
    }
    this.tbody.add(_tr);

    return _tr;
  }
  clear() {
    this.tbody.clear();// clear the table content
    return this;
  }
}
export class Table extends Widget {
  constructor(header, style = []) {
    super("div"); // Call the parent class's constructor
    this.option = []; // Options or data storage for the table
    this.table = null; // Table element
    this.tbody = null; // Table body element
    this.__header = header; // Store header information
    this.loader = null; // Loader element
    this.loader = new div().control;
    this.loader.style.padding = "10px";
    this.loader.innerHTML = '<span class="loader"></span>';
    this._c = this.control; // Create a container for the table
    this.table = new table().control; // Create the table element
    this.table.setAttribute("class", "table"); // Set class for the table
    this.tbody = new tbody().control; // Create table body element
    this.control = this.table; // Reference to the table control
    const _thead = new thead().control;
    const _tr = new tr().control;
    for (let i = 0; i < header.length; i++) {
      const _th = new th().control;
      _th.innerHTML = header[i];
      if (i < style.length) {
        for (let key in style[i]) {
          _th.style[key] = style[i][key]; // Apply styles to header cells
        }
      }
      _tr.appendChild(_th); // Append header cell to header row
    }
    _thead.appendChild(_tr); // Append header row to thead
    this.table.appendChild(_thead); // Append thead to table
    this.table.appendChild(this.tbody); // Append tbody to table
    this._c.appendChild(this.table); // Append table to container
  }
  clear() {
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild); // Clear existing table rows
    }
    return this;
  }
  _con_clear() {
    while (this._c.firstChild) {
      this._c.removeChild(this._c.firstChild); // Clear container
    }
    return this;
  }
  show() {
    this._con_clear();
    this._c.style.display = "block"; // Make the table visible
    this._c.appendChild(this.table); // Append table to container
    return this;
  }
  getTable() {
    return this.table; // Return the table element
  }
  load() {
    this._con_clear();
    this._c.appendChild(this.loader); // Show loader in container
    return this;
  }
  row(data) {
    this.clear(); // Clear current rows
    for (let i = 0; i < data.length; i++) {
      const _tr = new tr(); // Create a new row
      const x = data[i];
      for (let j = 0; j < x.length; j++) {
        const _td = new td(); // Create a cell
        const y = x[j];
        _td.style.cursor = "pointer";
        if (typeof (y) === "object") {
          _td.appendChild(y); // If the cell data is an object (like a button), append it directly
        } else {
          _td.innerHTML = y; // Otherwise, set text content
        }
        _tr.appendChild(_td); // Append cell to row
      }
      this.tbody.appendChild(_tr); // Append row to table body
    }
    return this;
  }
  prepend(data) {
    const _tr = new tr(); // Create a new row
    for (let i = 0; i < data.length; i++) {
      const y = data[i];
      const _td = new td(); // Create a cell
      td.style.cursor = "pointer";   
      if (typeof (y) === "object") {
        _td.appendChild(y); // Append object directly
      } else {
        _td.innerHTML = y; // Set inner HTML for string content
      }
      _tr.appendChild(_td); // Append cell to row
    }
    this.tbody.prepend(_tr); // Prepend the new row to the table body
    return this;
  }
  add(data, style = [], tr_style = {}) {
    this.option.push(data); // Push new data into options
    const _tr = new tr().control; // Create a new row
    for (let i = 0; i < data.length; i++) {
      const y = data[i];
      const _td = new td().control; // Create a cell
      _td.style.cursor = "pointer";
      if (i < style.length) {
        for (let key in style[i]) {
          _td.style[key] = style[i][key]; // Apply cell styles
        }
      }
      if (typeof (y) === "object") {
        _td.appendChild(y.getContainer()); // Append object if present
      } else {
        _td.innerHTML = y; // Append string content
      }
      _tr.appendChild(_td); // Append to row
    }
    if (tr_style) {
      for (let item in tr_style) {
        _tr.style[item] = tr_style[item]; // Apply styles to the row
      }
    }
    this.tbody.appendChild(_tr); // Append the row to the table body
    return this;
  }
  getValue() {
    const data = [];
    const optionLen = this.option.length;
    for (let i = 0; i < optionLen; i++) {
      const sdata = [];
      const slen = this.option[i].length;
      for (let j = 0; j < slen; j++) {
        sdata.push(this.option[i][j].getValue()); // Extract values
      }
      data.push(sdata); // Push row data into results
    }
    return data; // Return collected data
  }
}
export class CheckBox extends Widget {
  constructor(_mark = false) {
    super("input"); // Call the parent class's constructor
    const mark = _mark; // Set the initial checked state
    this._c = new input().control; // Create the checkbox input element
    this._c.style.height = "20px"; // Set height
    this._c.style.width = "20px"; // Set width
    this._c.setAttribute("type", "checkbox"); // Set input type to checkbox
    this._c.checked = mark; // Set initial checked state
    this._n = this._c; // Reference to the checkbox element
    this.control = this._c; // Reference to the checkbox control
    this.events = {}; // Object to store event listeners
  }
  setValue(mark_true_false) {
    this._n.checked = mark_true_false; // Set the checked state
    return this;
  }
  getValue() {
    return this._n.checked; // Return the current checked state
  }
  addEventListener(evt, callback) {
    if (typeof this.events[evt] === "undefined") {
      this._n.addEventListener(evt, callback); // Add the event listener
      this.events[evt] = evt; // Store the event to avoid duplicates
    }
    return this;
  }
}
export class RadioButton extends Widget {
  constructor(name = "") {
    super("div"); // Call the parent class's constructor
    this.name = name; // Set the name property
    this._c = this.control; // Create main container for radio buttons
    this.control = this._c; // Reference to the main control
    this.events = {}; // Initialize an event dictionary
    this.el = []; // Array to store radio button elements
  }
  add(label_, value) {
    const c = this._c; // Reference to main container
    const p = new div().control; // Create a wrapper for the radio input
    p.style.position = "relative"; // Set position for the wrapper
    const rad = new input().control; // Create radio input element
    rad.style.height = "20px"; // Set height
    rad.style.width = "20px"; // Set width
    rad.style.position = "absolute"; // Set position
    rad.style.top = "3px"; // Adjust top position
    const id_val = label_.replace(" ", "").trim(); // Create a unique id based on label
    rad.setAttribute("type", "radio");
    rad.setAttribute("name", this.name); // Set the name attribute for grouping
    rad.setAttribute("value", value); // Set the value
    rad.setAttribute("id", id_val); // Set the id
    const labelf = new label(); // Create label element
    labelf.setAttribute("for", id_val); // Associate label with radio button
    labelf.innerText = label_; // Set the label text
    labelf.style.marginLeft = "23px"; // Add some left margin
    labelf.style.marginTop = "7px"; // Add some top margin
    p.appendChild(rad);
    p.appendChild(labelf);
    c.appendChild(p);
    this.el.push(rad); // Store reference to the radio button
  }
  setValue(value) {
    for (const r of this.el) {
      if (r.value === value) {
        r.checked = true; // Check the radio button
        break;
      }
    }
    return this;
  }
  getValue() {
    for (const r of this.el) {
      if (r.checked) {
        return r.value; // Return the value of the checked button
      }
    }
    return ""; // Return empty string if none are checked
  }
}
export class TextBox extends Widget {
  constructor(lbl = "", type = "text", icon = null, hint = null, placeholder = "") {
    super("div"); // Call the parent class's constructor
    if (icon) {
      this.class("input-group");
      this.placeholder = placeholder; // Placeholder text
      this.hint = hint; // Tooltip hint
      this.icon = icon; // Icon class
      this.type = type; // Input type
      this._lb = label; // Label text
      this.events = {}; // Object to store event listeners
      const addon = new span().class("input-group-text");
      if (icon != null) {
        addon.add(
          new i().attr("class", `fa fa-${icon}`)
        );
      } else if (lbl != "") {
        addon.text(lbl);
      }
      this.add(addon);
      this.tf = new input().attr({
        type: type,
        class: "form-control",
        placeholder: this.placeholder
      });
      this.add(this.tf);  
    } else {
      this.class(["form-floating", "mb-3", "m5-3"]);
      this.hint = hint; // Tooltip hint
      this.icon = icon; // Icon class
      this.type = type; // Input type
      this.events = {}; // Object to store event listeners
      this.tf = new input().attr({
        type: type,
        class: "form-control",
        placeholder: ""
      });
      this.add(this.tf);  
      this.add(new label().html(lbl));
    }
  }
  setPlaceHolder(t) {
    this.tf.attr("placeholder", t); // Update placeholder
    return this;
  }
  setValue(value) {
    this.tf.value(value); // Update value
    return this;
  }
  getValue() {
    return this.tf.value(); // Get the current value
  }
  setStyle(styles) {
    this.tf.style(styles);
    return this;
  }
  addEventListener(evt, callback) {
    if (typeof this.events[evt] === "undefined") {
      this.tf.addEventListener(evt, callback); // Add the event listener
      this.events[evt] = evt; // Store the event to avoid duplicate listeners
    }
    return this;
  }
}
export class Label extends label {
  constructor() {
    super();
  }
}
export class Center extends center {
  constructor() {
    super();
  }
}
export class Bold extends b {
  constructor() {
    super();
  }
}
export class ComboBox2 extends div {
  constructor(lbl = "",  icon = null, hint = null) {
    super();   
    if (icon) {
      this.class("input-group");
      this.icon = icon; // Icon class
      this._lb = lbl; // Label text
      this.events = {}; // Object to store event listeners
      const addon = new span().class("input-group-text");
      if (icon != null) {
        addon.add(
          new i().attr("class", `fa fa-${icon}`)
        );
      } else if (lbl != "") {
        addon.text(lbl);
      }
      super.add(addon);
      this.tf = new select().attr({
        class: "form-control",
        placeholder: this.placeholder
      });
      super.add(this.tf);  
    } else {
      this.class(["form-floating", "mb-3", "m5-3"]);
      this.icon = icon; // Icon class
      this.events = {}; // Object to store event listeners
      this.tf = new select().attr({
        class: "form-control"
      });
      super.add(this.tf);  
      super.add(new label().html(lbl));
    }
  }
  add(key, value) {
    const opt = new option();
    opt.attr("value", key);
    opt.text(value);
    this.tf.add(opt);
  }
  setValue(key) {
    this.tf.value(key);
  }
  getValue() {
    return this.tf.value();
  }
  addEventListener(evt, callback) {
    const isEventDefined = typeof this.events[evt] === "undefined";
    if (isEventDefined) {
      this.tf.addEventListener(evt, callback);
      this.events[evt] = evt; // Store the event to avoid duplicate listeners
    }
    return this;
  }
  clear() {
    this.tf.clear();
    return this;
  }
}
export class ComboBox extends Widget {
  constructor(option = [], label, type = "text", icon = null, hint = null, placeholder = "") {
    super("div"); // Call the parent class constructor
    this.class("input-group");   
    this.option = option; // Array of options
    this.options = []; // To store option elements
    this.placeholder = placeholder;
    this.hint = hint;
    this.icon = icon;
    this.type = type;
    this._lb = label; // Label text
    this.events = {};
     const addon = new span().class("input-group-text");
     if (icon != null) {
       addon.add(
         new i().attr("class", `fa fa-${icon}`)
       );
     } else if (label != "") {
       addon.text(label);
     }
     this.tf = new select().attr({
       class: "form-control"
     });
     super.add([addon, this.tf]);
     if (option instanceof Array) {
      for (const item of option) {
        this.add(item[0], item[1]);
      }
     }
  }
  setPlaceHolder(t) {
    this.tf.attr("placeholder", t);
    return this;
  }
  setValue(value) {
    this.tf.value(value);
    return this;
  }
  getValue() {
    return this.tf.value();
  }
  addEventListener(evt, callback) {
    const isEventDefined = typeof this.events[evt] === "undefined";
    if (isEventDefined) {
      this.tf.addEventListener(evt, callback);
      this.events[evt] = evt; // Store the event to avoid duplicate listeners
    }
    return this;
  }
  clear() { 
    this.tf.clear();
    this.options = []; // Clear the options array
    return this;
  }
  add(key, value) {
    const option_ = new option();
    option_.attr("value", key);
    option_.text(value);
    this.tf.add(option_);
    this.options.push(option_); // Store the reference to the option element
    return this;
  }
}
export class Button extends Widget {
  constructor(name = "", type = "default", icon = "", hint = null) {
    super("button");
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.hint = hint;
    this.events = {}; // To track event listeners
    if (type == "default") {
      this.type = "success";
    }
    if (this.type) {
      this.control.setAttribute("class", `btn btn-${this.type}`);
    }
    this._i = new i().control;
    if (this.icon) {
      this._i.setAttribute("class", `fa fa-${this.icon}`);
      this._i.style.marginRight = "5px";
    }
    if (this.hint) {
      this.control.setAttribute("data-toggle", "tooltip");
      this.control.setAttribute("title", this.hint);
    }
    const nameElement = new span().control;
    nameElement.innerHTML = this.name; 
    this.control.appendChild(this._i);
    this.control.appendChild(nameElement);
  }
  addEventListener(evt, callback) {
    if (!this.events[evt]) {
      this.action(evt, callback);
      this.events[evt] = evt; // Track registered event
    }
    return this;
  }
  setIcon(icon) {
    this._i.style.marginRight = "5px";
    this._i.setAttribute("class", `fa fa-${icon}`);
    return this;
  }
}
export class Panel extends Widget {
  constructor(widget = []) {
    super("div"); // Call the parent class constructor
    this._c = this.control; // Assuming _.c creates a DOM element
    this.control = this._c;
    widget.forEach(item => {
      this.control.appendChild(item.getContainer());
    });
  }
  add(mcontrol_obj) {
    super.add(mcontrol_obj);
    return this; // Allow method chaining
  }
  addEventListener(event, fn) {
    this._c.addEventListener(event, fn);
    return this; // Allow method chaining
  }
}
export class Iframe extends Widget {
  constructor(widget = []) {
    super("iframe"); // Call the parent class constructor
    this._c = this.control; // Assuming _.c creates a DOM element
    this.control = this._c;
    widget.forEach(item => {
      this.control.appendChild(item.getContainer());
    });
  }
}
export class Frame extends iframe {
  constructor() {
    super();
  }
}
export class Modal extends Widget {
  constructor(title, icon = '', isFullScreen = false) {
    super("div");
    this.title = title || '';
    this.icon = icon;
    this.isFullScreen = isFullScreen;
    this.dialog = null; // Dialog element
    this.body = null; // Content body
    this.type = null; // Optional type
    this.close = null; // Close button 
    this.control.setAttribute("class", "dialog_container");
    this.dialog = new div().control;
    this.dialog.setAttribute("class", "dialog_modal");
    this.close = new button().control;
    this.close.innerHTML = 'x';
    this.close.style.height = "23px";
    this.close.style.width = "23px";
    this.close.style.position = "absolute";
    this.close.style.right = "10px";
    this.close.style.top = "3px";
    this.close.style.fontSize = "9pt";
    if (!this.type) {
      this.close.addEventListener("click", () => this.hide());
    }
    const titleElement = new div().control;
    titleElement.classList.add("title");
    titleElement.style.position = "relative";
    titleElement.innerHTML = `<i class="fa fa-${this.icon}"></i>${this.icon ? ' ' : ''}${this.title}`;
    titleElement.appendChild(this.close);
    this.dialog.appendChild(titleElement);
    this.body = new div().control;
    this.body.style.padding = "10px";
    this.body.style.position = "relative";
    this.dialog.appendChild(this.body);
    this.control.appendChild(this.dialog);
    this._c = this.control;
  }
  add(objElement) {
    if (Array.isArray(objElement)) {
      objElement.forEach((element) => {
        this.body.appendChild(element.getContainer());
      });
    } else {
      this.body.appendChild(objElement.getContainer());
    }
    return this;
  }
  hide() {
    this.control.style.display = 'none';
  }
  show() {
    this.control.style.display = 'block';
  }
}
export class ModalV2 extends Modal {
  constructor(title, icon, is_full_screen = false) {   
    super(title, icon, is_full_screen);
    this.type = 1;
    this.resolve = null;
    this.resolvefn = null;
    this.control = this.dialog;
    document.body.append(this._c);
  }
  mwidth(minus) {
    this.setStyle({
        width: `${window.innerWidth - minus}px`
    });
  }
  async show() {
    this._c.style.display = 'block';
    const promise = new Promise((resolve, reject) => {
      this.resolvefn = resolve;
      this.close.addEventListener("click", () => {
        resolve(this.resolve);
        this._c.remove();
      });
    });
    return await promise;
  }
  hide(resolve = null) {
    if (this.resolve == true) { 
      this.resolvefn(this.resolve);
    } else {
      this.resolvefn(resolve);
    }
    this._c.remove();
  }
}
export class MessageBox extends Widget {
  constructor() {
    super("div");
    this._c = this.control;
    this._c.style.display = "none";
    this._c.style.backgroundColor = "rgba(0, 0, 0, 0.12)";
    this._c.style.zIndex = "1000";
    this._c.style.width = "100%";
    this._c.style.height = "100%";
    this._c.style.position = "fixed";
    this._c.style.left = "0";
    this._c.style.top = "0";
    this._d = new div().control;
    this._d.style.position = "absolute";
    this._d.style.width = "360px";
    this._d.style.height = "200px";
    this._d.style.backgroundColor = "white";
    this._d.style.left = "0";
    this._d.style.right = "0";
    this._d.style.bottom = "0";
    this._d.style.top = "0";
    this._d.style.margin = "auto";
    this._d.style.borderRadius = "10px";
    this._d.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
    this._k = new button().control;
    this._k.innerHTML = "OK";
    this._k.style.width = "100px";
    this._k.style.height = "35px";
    this._k.style.backgroundColor = "#16c4cd";
    this._k.style.color = "white";
    this._k.style.fontWeight = "bold";
    this._k.style.border = "1px solid rgba(255, 255, 255, 0.3)";
    this._k.style.position = "absolute";
    this._k.style.left = "0";
    this._k.style.right = "0";
    this._k.style.bottom = "10px";
    this._k.style.margin = "auto";
    this._lb = new label().control;
    this._lb.style.position = "absolute";
    this._lb.style.left = "0";
    this._lb.style.right = "0";
    this._lb.style.top = "10px";
    this._lb.style.fontSize = "30pt";
    this._lb.style.margin = "auto";
    this._lb.style.width = "200px";
    this._lb.style.height = "20pt";
    this._lb.style.textAlign = "center";
    this._lb.style.color = "#8f8787";
    this._lb.style.fontWeight = "bold";
    this._m = new p().control;
    this._m.style.position = "absolute";
    this._m.style.left = "0";
    this._m.style.right = "0";
    this._m.style.top = "80px";
    this._m.style.fontSize = "15pt";
    this._m.style.margin = "auto";
    this._m.style.width = "250px";
    this._m.style.height = "20pt";
    this._m.style.textAlign = "center";
    this._m.style.color = "#8f8787";
    this._d.appendChild(this._lb);
    this._d.appendChild(this._m);
    this._d.appendChild(this._k);
    this._c.appendChild(this._d);
    this.callback = null;
    this._k.addEventListener("click", () => {
      this.hide();
      if (this.callback) {
        this.callback();
      }
    });
  }
  show(msg = '', callback = undefined) {
    const type = "A l e r t !";
    this._c.style.display = "block";
    this._lb.innerHTML = type;
    this._m.innerHTML = msg;
    this.callback = callback;
    return this;
  }
  hide() {
    this._c.style.display = "none";
  }
}
export class ConfirmBox extends Widget {
  constructor() {
    super("div");
    this._c = this.control;
    Object.assign(this._c.style, {
      display: "none",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      zIndex: "1001",
      width: "100%",
      height: "100%",
      position: "fixed",
      left: "0",
      top: "0",
    });
    this._d = new div().control;
    Object.assign(this._d.style, {
      position: "absolute",
      width: "360px",
      height: "200px",
      backgroundColor: "white",
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    });
    this._k = new button().control;
    Object.assign(this._k.style, {
      width: "100px",
      height: "35px",
      backgroundColor: "#16c4cd",
      color: "white",
      fontWeight: "bold",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    });
    this._k.innerHTML = "OK";
    this._cls = new button().control;
    Object.assign(this._cls.style, {
      width: "100px",
      height: "35px",
      backgroundColor: "rgb(255, 62, 97)",
      color: "white",
      fontWeight: "bold",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    });
    this._cls.innerHTML = "Close";
    this._b = new div().control;
    Object.assign(this._b.style, {
      position: "absolute",
      width: "200px",
      height: "40px",
      left: "0",
      right: "0",
      bottom: "10px",
      margin: "auto",
    });
    this._b.appendChild(this._k);
    this._b.appendChild(this._cls);
    this._lb = new label().control;
    Object.assign(this._lb.style, {
      position: "absolute",
      left: "0",
      right: "0",
      top: "15px",
      fontSize: "15pt",
      margin: "auto",
      width: "220px",
      height: "20pt",
      textAlign: "center",
      color: "#8f8787",
      fontWeight: "bold",
    });
    this._m = new p().control;
    Object.assign(this._m.style, {
      position: "absolute",
      left: "0",
      right: "0",
      top: "80px",
      fontSize: "15pt",
      margin: "auto",
      width: "250px",
      height: "20pt",
      textAlign: "center",
      color: "#8f8787",
    });
    this._d.appendChild(this._lb);
    this._d.appendChild(this._m);
    this._d.appendChild(this._b);
    this._c.appendChild(this._d);
    this.callback = null;
    this._cls.addEventListener("click", () => {
      this.hide();
    });
    this._k.addEventListener("click", () => {
      this.hide();
      if (this.callback) this.callback(true);
    });
  }
  show(msg = "", callback = undefined) {
    const type = "C O N F I R M A T I O N";
    this.control.style.display = "block";
    this._lb.innerHTML = type;
    this._m.innerHTML = msg;
    this.callback = callback;
  }
  async show_r(msg = "") {
    const type = "C O N F I R M A T I O N";
    this.control.style.display = "block";
    this._lb.innerHTML = type;
    this._m.innerHTML = msg;
    return new Promise((resolve) => {
      this.callback = (ok) => resolve(ok);
    });
  }
  hide() {
    this.control.style.display = "none";
  }
}
export class ProgressBar extends Widget {
  constructor() {
    super("div");
  }
}
export class LoaderBox extends Widget {
  constructor() {
    super("div");
    this._c = this.control;
    Object.assign(this._c.style, {
      display: "none",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      zIndex: "1000",
      width: "100%",
      height: "100%",
      position: "fixed",
      left: "0",
      top: "0",
    });
    this._d = new div().control;
    Object.assign(this._d.style, {
      position: "absolute",
      width: "300px",
      height: "150px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    });
    this._loader = new span().control;
    this._loader.setAttribute("class", "loader");
    this._label = new label().control;
    Object.assign(this._label.style, {
      fontWeight: "bold",
      marginTop: "10px",
    });
    this._label.innerHTML = "Please Wait...";
    this._d.appendChild(this._label);
    this._d.appendChild(this._loader);
    this._c.appendChild(this._d);
  }
  show(loadertxt = "Please Wait...") {
    this._c.style.display = "block";
    this._label.innerHTML = loadertxt;
    return this;
  }
  hide() {
    this._c.style.display = "none";
    return this;
  }
}
export class Form extends Widget {
  constructor() {
    super("div");
    this._c = this.control; // Main container
    this.control = this._c; // Reference to the main control container
    this._v = []; // Array to store form elements and their associated names
    this.input = {}; // Object to map element names to their instances
  }
  getValues() {
    const data = {};
    for (let i = 0; i < this._v.length; i++) {
      const [name, element] = this._v[i];
      data[name] = element.getValue();
    }
    return data;
  }
  add(o, n = null) {
    if (Array.isArray(o)) {
      for (let i = 0; i < o.length; i++) {
        const [element, name] = o[i];
        if (name != null) {
          this._v.push([name, element]);
          this.input[name] = element;
        }
        this._c.appendChild(element.getContainer());
      }
    } else {
      if (n != null) {
        this._v.push([n, o]);
        this.input[n] = o;
      }
      this._c.appendChild(o.getContainer());
    }
    return this;
  }
  clear() {
    for (let i = 0; i < this._v.length; i++) {
      const [, element] = this._v[i];
      element.setValue("");
    }
    return this;
  }
}
export var x_storage = {
  items: {},
  setItem: function (key, value) {
    this.items[key] = value;
  },
  getItem: function (key) {
    var value = this.items[key];
    if (typeof (value) != 'undefined') {
      return value;
    }
    return null;
  }
};
export const Scaffold = async function (action = null, obj = null) {
  const panel = new Panel().setStyle({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
    overflowY: 'auto'
  });
  const nav = new Panel().setStyle({
    width: '100%',
    height: '50px',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.4)'
  });
  const back = new Button('Exit', 'default', 'close', 'click to go back').setStyle({
    position: 'absolute',
    left: '5px',
    top: '8px'
  });
  if (action != null) {
    nav.add(new Panel().setStyle({
      height: '100%',
      position: 'absolute',
      left: '90px',
      top: '0'
    }).add(action));
  }
  nav.add(back);
  panel.add(nav);
  const content = new Panel().setStyle({
    paddingTop: '50px'
  });
  if (obj != null) {
    panel.add(content);
    content.add(obj);
  }
  document.body.append(panel.getContainer());
  const promise = new Promise((resolve, reject) => {
    back.addEventListener('click', function (e) {
      panel.getContainer().remove();
      resolve(null);
    });
  });
  return await promise;
};
const loader_info = [];
export class MsgLoader extends Panel {
  constructor(loader_msg = 'Fetching...') {
    super();
    document.body.append(this._c);
    this.un = loader_info.length;
    const bot_pos = 10 + (this.un * (45)); // calculate the position of each msg loader
    this.setStyle({
      padding: '5px',
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      width: '300px',
      height: '40px',
      position: 'fixed',
      right: '20px',
      bottom: `${bot_pos}px`,
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
      borderRadius: '5px'
    });
    loader_info.push({
      object: this
    });
    this.panel = new Panel();
    this.panel.add(new Label(`<i class="fa fa-refresh rotate" style="color: orange;"></i> <span style="color: red;"> - ${loader_msg}</span>`));
    this.add(this.panel);
  }
  hide(msg_done = 'Loaded!', error = false) {
    this.panel.clear();
    if (!error) {
      this.panel.add(new Label(
        `<i class="fa fa-check" style="color: green;"></i> <span style="color: green;"> - ${msg_done}</span>`
      ));
    } else {
      this.panel.add(new Label(
        `<i class="fa fa-close" style="color: red;"></i> <span style="color: red;"> - ${msg_done}</span>`
      ));
    }
    setTimeout(() => {
      this._remove();
      // reposition all the msg
    }, 3000);
  }
  _remove() {
    this._c.remove();
    loader_info.splice(this._c.un, 1);
  }
}
export class DropDown extends div {
  constructor(title, type = "default", hint = "") {
    super();
    this.class("dropdown");
    const btn = new button().class([
      "btn", "btn-primary", "dropdown-toggle"
    ]).attr({
      type: "button",
      "data-bs-toggle": "dropdown"
    });
    const caret = new span().class("caret");
    btn.add([new span().html(title), caret]);
    this.ul = new ul().class("dropdown-menu");
    this.add([
      btn,
      this.ul
    ]);
  }
  show() {
  }
  addItem(html, fn) { 
    const _li = new li();
    const _a = new a().html(html).class("dropdown-item");
    _li.add(_a);
    this.ul.add(_li);
    if (typeof(fn) == "function") {
      _a.action("click", (e) => {
        fn();
        e.preventDefault();
      });
    }
  }
}
class BasicTab extends Panel {
  constructor() {
    super();
    this.ul_ = new ul().class(["nav", "nav-tabs"]);
    this.list = [];
    this.content = new div();
    super.add([this.ul_, this.content]);
  }
  _clearactive() {
    for (const item of this.list) {
      item.removeClass("active");
    }
  }
  add(name, fn, is_active = false) {
    const li_ = new li().class("nav-item"); 
    const a_ = new a().class("nav-link").html(name);
    li_.add(a_);
    this.ul_.add(li_);
    this.list.push(a_);
    a_.attr("href", "#");
    li_.addEventListener("click", () => {
      this._clearactive();
      this.content.clear();
      a_.class("active");
      fn(this.content);
    });
    if (is_active) {
      this._clearactive();
      this.content.clear();
      // li_.add("active");
      a_.class("active");
      fn(this.content);
    }
  }
}
class li2 extends li {
  constructor() {
    super();
    this.fn = null;
  }
}
class DropdownTab extends Panel {
  constructor() {
    super();
    this.ul_ = new ul().class(["class", "nav", "nav-tabs"]);
    this.list = [];
    this.content = new div();
    super.add([this.ul_, this.content]);
    this.lis = [];
  }
  _clearactive() {
    for (const item of this.list) {
      item.removeClass("active");
    }
  }
  add(name, arr, is_active = false) {
    const li_ = new li2().class(["nav-item", "dropdown"]); 
    const a_  = new a().class(["nav-link", "dropdown-toggle"]).attr({
      "data-bs-toggle": "dropdown"
    }).html(name);
    li_.add(a_); 
    this.ul_.add(li_);
    this.list.push(a_);
    const arr_len = arr.length;
    if (arr_len > 0) {
      li_.class("dropdown");
      const a_ = new a().class("dropdown-item");
      a_.class("dropdown-toggle");
      a_.attr("data-toggle", "dropdown");
      a_.attr("href", "#");
      a_.html(`${name} <span class="caret"></span>`);
      a_.attr("aria-expanded", "true");
      a_.style({
        fontSize: "12px"
      });
      const ul_ = new ul();
      ul_.class("dropdown-menu");
      let toggle = false;
      for (let i = 0; i < arr_len; i++) {
        const li_ = new li();
        const _a = new a().html(`${arr[i][0]}`).class("dropdown-item");
        this.lis.push(_a);
        li_.add(_a);
        li_.addEventListener("click", (e) => {
          e.stopPropagation();
          for (const s of this.lis) {
            s.removeClass("active");
          }
          _a.class("active");
          this.content.clear();
          const fn = arr[i][1];
          fn(this.content);
        });
        ul_.add(li_);
      }
      li_.add(ul_);
    }
    if (arr_len > 0) {
      li_.fn = arr[0][1];
    }
    li_.addEventListener("click", (e) => {
      this._clearactive();
      li_.widgets[0].class("active");
      if (li_.fn != null) {
        this.content.clear();
        li_.fn(this.content);
      }
    });
    if (is_active) {
      li_.widgets[0].class("active");
    }
  }

}
class Card extends div {
  constructor(obj = null) {
    super();
    this.style({
      width: "100%",
      padding: "5px",
      backgroundColor: "#fffbd1",
      borderRadius: "5px",
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)"
    });
    if (obj != null) {
      super.add(obj);
    }
  }
}
export {
  Table2,
  Card,
  BasicTab,
  DropdownTab
};
