// for interface
var _ = {
  c: function(l) {
    return document.createElement(l);
  },
  e: function(a, c) {
    o.addEventListener(_, c);
  }
};

var Interface = function() {};

Interface.prototype.id = null;
Interface.prototype.container = null;
Interface.prototype.control = null;

Interface.prototype.getContainer = function() {
  return this._c;
};

Interface.prototype.hide = function() {
  this._c.style.display = "none";
};

Interface.prototype.show = function() {
  this._c.style.display = "block";
};

Interface.prototype.setId = function(id) {
  this.id = id;
};

Interface.prototype.getId = function() {
  return this.id;
};

Interface.prototype.setBackgroundColor = function(color) {
  this.control.style.backgroundColor = color;
};

Interface.prototype.setFontColor = function(color) {
  this.control.style.color = `${color}`;
};

Interface.prototype.setFontStyle = function(font_family) {
  this.control.style.fontFamily = `${font_family}`;
};

Interface.prototype.addClass = function(_) {
  if (typeof(_) == "string") {
    this.control.classList.add(_);
  } else if(_ instanceof Array) {
    for (var x of _) {
      this.control.classList.add(x);
    }
  } else {
    console.log("Invalid remove class parameter");
  }
};

Interface.prototype.removeClass = function(_) {
  if (typeof(_) == "string") {
    this.control.classList.remove(_);
  } else if(_ instanceof Array) {
    for (var x of _) {
      this.control.classList.remove(x);
    }
  } else  {
    console.log("Invalid remove class parameter");
  }
};

Interface.prototype.clear = function() {
  while (this._c.firstChild) {
    this._c.removeChild(this._c.firstChild);
  }
};

Interface.prototype.setBackgroundImage = function(img) {
  // image goes here
};
// end for interface


/* Application */ 
var Application = function() {
  this.body = null;
  this.body = document.getElementsByTagName("body")[0];
  this._c = _.c("div");
  this.body.append(this._c);
  this._c.style.width = "100%";
  this._c.style.height = "100%";
  this._c.style.margin = "0px";
  this._c.style.padding = "0px";
  this._c.style.position = "relative";
};

Application.prototype = Object.create(Interface.prototype);

Application.prototype.clear = function() {
  while(this._c.firstChild) {
    this._c.removeChild(this._c.firstChild);
   };
};

Application.prototype.open = function(panel) {
  this.clear();
  this._c.append(panel.getContainer());
};

Application.prototype.add = function(obj) {
  this._c.append(obj.getContainer());
};

/* End Application */



// Table control
var Table = function(header) {

  this.table = null;
  this.tbody = null;
  this.__header = header;
  this.loader = null;

  // initialized class
  this.loader = _.c("div");
  this.loader.style.padding = "10px";
  this.loader.innerHTML = `<span class="loader"></span>`;

  var header = this.__header;;
  
  this._c = _.c("div");
  // this._c.style.display = "none";
  this.table = _.c("table");
  this.table.setAttribute("class", "table");
  this.tbody = _.c("tbody");

  this.control = this.table;
  // create header
  var thead = _.c("thead");
  var tr = _.c("tr");
  var th = _.c("th");
  for (var x of header) {
    var th = _.c("th");
    th.innerHTML = x;
    tr.append(th);
  }
  
  thead.append(tr);
  this.table.append(thead);
  // end create header
  
  // initialized the body of the table
  this.table.append(this.tbody);
  this._c.append(this.table);

};

Table.prototype = Object.create(Interface.prototype);

Table.prototype.clear = function() {
  while (this.tbody.firstChild) {
    this.tbody.removeChild(this.tbody.firstChild);
  }
};

Table.prototype._con_clear = function() {
  while (this._c.firstChild) {
    this._c.removeChild(this._c.firstChild);
  }
};

Table.prototype.show = function() {
  this._con_clear();
  this._c.style.display = "block";
  this._c.append(this.table);
};

Table.prototype.getTable = function() {
  return this.table;
};

Table.prototype.load = function() {
  // loader
  this._con_clear();
  this._c.append(this.loader);
};

Table.prototype.row = function(data) {
  // clear the body
  this.clear();
    
  // manipulate the body
  for (var x of data) {
    var tr = _.c("tr");
    
    for (var y of x) {
      console.log(typeof(y));
      var td = _.c("td");
      td.style.cursor = "pointer";
      if (typeof(y) == "object") {
        td.append(y); // if button or any elements
      } else {
        td.innerHTML = y;
      }
      tr.append(td);
    }

    this.tbody.append(tr); 
  }
  // end update the body
};

Table.prototype.prepend = function(data) {
  var tr = _.c("tr");
  for (var y of data) {
    var td = _.c("td");
    td.style.cursor = "pointer";
    if (typeof(y) == "object") {
      td.append(y); // if button or any elements
    } else {
      td.innerHTML = y;
    }
    tr.append(td);
  }
  this.tbody.prepend(tr);
};

// add row 
Table.prototype.add = function(data) {
  var tr = _.c("tr");
  for (var y of data) {
    var td = _.c("td");
    td.style.cursor = "pointer";
    if (typeof(y) == "object") {
      td.append(y.getContainer()); // if button or any elements
    } else {
      td.innerHTML = y;
    }
    tr.append(td);
  }
  this.tbody.append(tr);
};


// end of the table

// text box

var TextBox = function(label, type, icon, hint, placeholder) {
  
  this.placeholder = placeholder || "";
  this.hint = hint || null;


  this.i = null;
  this.icon = icon || null;
  this.type = type || "text";

  this._lb = label;

  this._c = null;
  this._n = null;

  this.events = {};

  // initialized class

  this._c = _.c("div");
  this._c.style.marginTop = "3px";
  this._c.setAttribute("class", "input-group");

  var span = _.c("span");
  
  this.i = _.c("i");
  this.i.setAttribute("class", `fa fa-${this.icon}`);
  span.setAttribute("class", "input-group-addon");

  if (this.icon != null) {
    span.append(this.i);
  } else {
    span.innerHTML = this._lb;
  }

  this._n = _.c("input");
  this._n.setAttribute("class", "form-control");
  this._n.setAttribute("type", this.type);
  this.control = this._n;
  if (this.hint != null) {
    this._n.setAttribute("data-toggle", "tooltip");
    this._n.setAttribute("title", this.hint);
  }

  this._n.setAttribute("placeholder", this.placeholder);

  this._c.append(span);
  this._c.append(this._n);
  
};

TextBox.prototype = Object.create(Interface.prototype);
TextBox.prototype.setPlaceHolder = function(t) {
  this._n.setAttribute("placeholder", t);
};
TextBox.prototype.setValue = function(value) {
  this._n.value = value;
};
TextBox.prototype.getValue = function() {
  return this._n.value;
};
TextBox.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this._n.addEventListener(evt, callback);
    }
    this.events[evt] = evt;
  }
};

// end text box

var Label = function(label) {
  this._lb = label || "";
  this._c = _.c("label");
  this._c.innerHTML = this._lb;
  this.control = this._c;
};
Label.prototype = Object.create(Interface.prototype);
Label.prototype.setValue = function(value) {
  this._c.innerHTML = value;
};


// comboBox
var ComboBox = function(option, label, type, icon, hint, placeholder) {
  
  this.option = option || [];

  /* 
    options must be an array of an array;
    example: [
      ["f", "Female"],
      ["m", "Male"],
      ["o", "Other"]
    ]
  */


  this.options = [];

  this.placeholder = placeholder || "";
  this.hint = hint || null;


  this.i = null;
  this.icon = icon || null;
  this.type = type || "text";

  this._lb = label;

  this._c = null;
  this._n = null;
  this.events = {};

  // initialized class
  this._c = _.c("div");
  this._c.style.marginTop = "3px";
  this._c.setAttribute("class", "input-group");

  var span = _.c("span");
  
  this.i = _.c("i");
  this.i.setAttribute("class", `fa fa-${this.icon}`);
  span.setAttribute("class", "input-group-addon");

  if (this.icon != null) {
    span.append(this.i);
  } else {
    span.innerHTML = this._lb;
  }

  this._n = _.c("select");
  this._n.setAttribute("class", "form-control");
  this._n.setAttribute("type", this.type);
  this.control = this._n;  
  if (this.hint != null) {
    this._n.setAttribute("data-toggle", "tooltip");
    this._n.setAttribute("title", this.hint);
  }

  this._n.setAttribute("placeholder", this.placeholder);

  // all all the options in the placeholder
  for (var v of this.option) {
    this.add(v[0], v[1]);
  }
  this._c.append(span);
  this._c.append(this._n);    

  this.control = this._c;
};

ComboBox.prototype = Object.create(Interface.prototype);
ComboBox.prototype.setPlaceHolder = function(t) {
  this._n.setAttribute("placeholder", t);
};
ComboBox.prototype.setValue = function(value) {
  this._n.value = value;
}
ComboBox.prototype.getValue = function() {
  return this._n.value;
};
ComboBox.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this._n.addEventListener(evt, callback);
    }
    this.events[evt] = evt;
  }
  
};
ComboBox.prototype.clear = function() {
  for (var x of this.options) {
    x.remove();
  }
};
ComboBox.prototype.add = function(key, value) {
  var option = _.c("option");
  option.setAttribute("value", key);
  option.innerHTML = value;
  this._n.append(option);
  this.options.push(option);
};
// end combobox
// button
var Button = function(name, type, icon, hint) {
  // container
  this.hint = hint || null;
  // type danger, success, primary

  this.type = type || null;
  this.name = name || "";
  this.icon = icon || "";

  this.events = {};
  
  this._c = _.c("button");
  this.control = this._c;
  if (this.type != null) {
    this._c.setAttribute("class", `btn btn-${this.type}`);
  }
  this._i = _.c("i");
  if (this.icon != "") {
    this._i.style.marginRight = "5px";
  }
  if (this.hint != null) {
    this._c.setAttribute("data-toggle", "tooltip");
    this._c.setAttribute("title", this.hint);
  }
  if (this.icon != "") 
    this._i.setAttribute("class", `fa fa-${this.icon}`);
  
  var name = _.c("span");
  name.innerHTML = this.name;
  this._c.append(this._i);
  this._c.append(name);
};

Button.prototype = Object.create(Interface.prototype);
Button.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this._c.addEventListener(evt, callback);
    }
    this.events[evt] = evt;
  }
};
Button.prototype.setIcon = function(_i) {
  this._i.style.marginRight = "5px";
  this._i.removeAttribute("class");
  this._i.setAttribute("class", `fa fa-${_i}`);
};
// end button


// modal
/*

  var dialog_con = _.c("div");
  dialog_con.setAttribute("class", "dialog_container");
  var dialog = _.c("div");
  dialog.setAttribute("class", "dialog_modal");

*/

var Panel = function(title) {
  this._c = _.c("div");
  this.control = this._c;
};
Panel.prototype = Object.create(Interface.prototype);
Panel.prototype.add = function(mcontrol_obj) {
  this._c.append(mcontrol_obj.getContainer());
};

var Modal = function(title, icon) {
  this.title = title || null;
  this.icon = icon || icon;

  this._c = null;
  this.dialog = null;
  this.body = null;

  // Intialized the class
  this._c = _.c("div");
  this._c.setAttribute("class", "dialog_container");
  
  this.dialog = _.c("div");
  this.dialog.setAttribute("class", "dialog_modal");
  
  var me = this;
  
  var close = _.c("button");
  close.innerHTML = `x`;
  close.style.height = "23px";
  close.style.width = "23px";
  close.style.position = "absolute";
  close.style.right = "10px";
  close.style.top = "3px";
  close.style.fontSize = "9pt";
  
  close.addEventListener("click", function() {
    me.hide();
  });
  
  var title = _.c("div");
  title.classList.add("title");
  title.style.position = "relative";
  title.innerHTML = `<i class="fa fa-${this.icon}"></i> ${this.title}`;
  title.append(close);

  this.dialog.append(title);
  // contents
  this.body = _.c("div");
  this.body.style.padding = "10px";
  this.body.style.position = "relative";
  this.dialog.append(this.body);
  // end contents
  this._c.append(this.dialog);
  
  this.control = this.dialog;
};

Modal.prototype = Object.create(Interface.prototype);
Modal.prototype.add = function(obj_element) {
  // only the above classes can be appended
  this.body.append(obj_element.getContainer());    
};



// alerts 
var MessageBox = function() {
  this._c = _.c("div");
  this._c.style.display = "none";
  this._c.style.backgroundColor = "rgba(0, 0, 0, 0.12)";
  this._c.style.zIndex = "1000";
  this._c.style.width = "100%";
  this._c.style.height = "100%";
  this._c.style.position = "fixed";
  this._c.style.left = "0";
  this._c.style.top = "0";

  this._d = _.c("div");
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

  this._k = _.c("button");
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

  this._lb = _.c("label");
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

  this._m = _.c("p");
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

  this._d.append(this._lb);
  this._d.append(this._m);
  this._d.append(this._k);

  this._c.append(this._d);
  
  var me = this;
  this.callback = null;
  this._k.addEventListener("click", function() {
    try {
      me.hide();
      me.call_back();
    } catch(er) {
      me.hide();
    }
  });
  this.control = this._d;
};

MessageBox.prototype = Object.create(Interface.prototype);

MessageBox.prototype.show = function(msg, _callback) {
  var type = type || "A l e r t !";
  var msg = msg || "";
  var _callback = _callback || undefined;
  this._c.style.display = "block";
  this._lb.innerHTML = type;
  
  this._m.innerHTML = msg;

  this.call_back = _callback;
};


var ConfirmBox = function() {
  this._c = _.c("div");
  this._c.style.display = "none";
  this._c.style.backgroundColor = "rgba(0, 0, 0, 0.12)";
  this._c.style.zIndex = "1001";
  this._c.style.width = "100%";
  this._c.style.height = "100%";
  this._c.style.position = "fixed";
  this._c.style.left = "0";
  this._c.style.top = "0";

  this._d = _.c("div");
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

  this._k = _.c("button");
  this._k.innerHTML = "OK";
  this._k.style.width = "100px";
  this._k.style.height = "35px";
  this._k.style.backgroundColor = "#16c4cd";
  this._k.style.color = "white";
  this._k.style.fontWeight = "bold";
  this._k.style.border = "1px solid rgba(255, 255, 255, 0.3)";
  // this._k.style.position = "absolute";
  // this._k.style.left = "0";
  // this._k.style.right = "0";
  // this._k.style.bottom = "10px";
  // this._k.style.margin = "auto";

  this._b = _.c("div");
  this._b.style.position = "absolute";
  this._b.style.width = "200px";
  this._b.style.height = "40px";
  this._b.style.left = "0";
  this._b.style.right = "0";
  this._b.style.bottom = "10px";
  this._b.style.margin = "auto";

  this._cls = _.c("button");
  this._cls.innerHTML = "Close";
  this._cls.style.width = "100px";
  this._cls.style.height = "35px";
  this._cls.style.backgroundColor = "rgb(255, 62, 97)";
  this._cls.style.color = "white";
  this._cls.style.fontWeight = "bold";
  this._cls.style.border = "1px solid rgba(255, 255, 255, 0.3)";
  // this._cls.style.position = "absolute";
  // this._cls.style.left = "0";
  // this._cls.style.right = "0";
  // this._cls.style.bottom = "10px";
  // this._cls.style.margin = "auto";

  this._lb = _.c("label");
  this._lb.style.position = "absolute";
  this._lb.style.left = "0";
  this._lb.style.right = "0";
  this._lb.style.top = "15px";
  this._lb.style.fontSize = "15pt";
  this._lb.style.margin = "auto";
  this._lb.style.width = "220px";
  this._lb.style.height = "20pt";
  this._lb.style.textAlign = "center";
  this._lb.style.color = "#8f8787";
  this._lb.style.fontWeight = "bold";

  this._m = _.c("p");
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

  this._b.append(this._k);
  this._b.append(this._cls);

  this._d.append(this._lb);
  this._d.append(this._m);
  this._d.append(this._b);

  this._c.append(this._d);
  

  var me = this;
  this.callback = null;
 
  this._cls.addEventListener("click", function() {
    me.hide();  
  });

  this._k.addEventListener("click", function() {
    try {
      me.hide();
      me.call_back();
    } catch(er) {
      me.hide();
    }
  });
  this.control = this._d;
};

ConfirmBox.prototype = Object.create(Interface.prototype);

ConfirmBox.prototype.show = function(msg, _callback) {
  var type = type || "C O N F I R M A T I O N";
  var msg = msg || "";
  var _callback = _callback || undefined;
  this._c.style.display = "block";
  this._lb.innerHTML = type;
  
  this._m.innerHTML = msg;

  this.call_back = _callback;
};


var ProgressBar = function() {
  this._c = _.c("div");
  
};
ProgressBar.prototype = Object.create(Interface.prototype);

var LoaderBox = function() {
  this._c = _.c("div");
  this._c.style.display = "none";
  this._c.style.backgroundColor = "rgba(0, 0, 0, 0.12)";
  this._c.style.zIndex = "1000";
  this._c.style.width = "100%";
  this._c.style.height = "100%";
  this._c.style.position = "fixed";
  this._c.style.left = "0";
  this._c.style.top = "0";

  this._d = _.c("div");
  this._d.style.position = "absolute";
  this._d.style.width = "300px";
  this._d.style.height = "150px";
  this._d.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  this._d.style.left = "0";
  this._d.style.right = "0";
  this._d.style.bottom = "0";
  this._d.style.top = "0";
  this._d.style.margin = "auto";
  this._d.style.borderRadius = "10px";
  this._d.style.boxShadow = "1px 1px 3px rgba(0, 0, 0, 0.5)";

  this._loader = _.c("span");
  this._loader.setAttribute("class", "loader");

  this._label = _.c("label");
  this._label.style.fontWeight = "bold";
  this._label.style.marginTop = "10px";
  this._label.innerHTML = "Please Wait...";
  this._d.style.textAlign = "center";

  this._d.append(this._label);
  this._d.append(this._loader);

  this._c.append(this._d);
  this.control = this._d;

};

LoaderBox.prototype = Object.create(Interface.prototype);


var Form = function() {
  this._c = _.c("div");
  this.control = this._c;

  this._v = [];
};

Form.prototype = Object.create(Interface.prototype);

Form.prototype.getValues = function() {
  var data = {};
  for (var x of this._v) {
    data[x[0]] = x[1].getValue();
  }
  return data;
};

Form.prototype.add = function(o, n) {
  var n = n || null;
  
  if (n != null) {
    this._v.push([n, o]);
  }

  this._c.append(o.getContainer());
};
/*
classes:
  Application
  Table
  Button
  TextBox
  ComboBox
  MessageBox
  ConfirmBox
  LoaderBox
  Form
*/
