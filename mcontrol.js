// for interface

var Interface = function() {};

Interface.id = null;
Interface.container = null;

Interface.prototype.getContainer = function() {
  return this.container;
};

Interface.prototype.hide = function() {
  this.container.style.display = "none";
};

Interface.prototype.show = function() {
  this.container.style.display = "block";
};

Interface.prototype.setId = function(id) {
  this.id = id;
};

Interface.prototype.getId = function() {
  return this.id;
};
// end for interface


/* Application */ 
var Application = function() {
  this.body = null;
  this.body = document.getElementsByTagName("body")[0];
  this.container = document.createElement("div");
  this.body.append(this.container);
  this.container.style.width = "100%";
  this.container.style.height = "100%";
  this.container.style.margin = "0px";
  this.container.style.padding = "0px";
  this.container.style.position = "relative";
};

Application.prototype = Object.create(Interface.prototype);

Application.prototype.clear = function() {
  while(this.container.firstChild) {
    this.container.removeChild(this.container.firstChild);
   };
};

Application.prototype.open = function(panel) {
  this.clear();
  this.container.append(panel.getContainer());
};

Application.prototype.add = function(obj) {
  this.container.append(obj.getContainer());
};

/* End Application */



// Table control
var Table = function(header) {

  this.table = null;
  this.tbody = null;
  this.__header = header;
  this.loader = null;

  // initialized class
  this.loader = document.createElement("div");
  this.loader.style.padding = "10px";
  this.loader.innerHTML = `<span class="loader"></span>`;

  var header = this.__header;;

  this.container = document.createElement("div");
  // this.container.style.display = "none";
  this.table = document.createElement("table");
  this.table.setAttribute("class", "table");
  this.tbody = document.createElement("tbody");

  // create header
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  for (var x of header) {
    var th = document.createElement("th");
    th.innerHTML = x;
    tr.append(th);
  }
  
  thead.append(tr);
  this.table.append(thead);
  // end create header
  
  // initialized the body of the table
  this.table.append(this.tbody);
  this.container.append(this.table);

};

Table.prototype = Object.create(Interface.prototype);

Table.prototype.clear = function() {
  while (this.tbody.firstChild) {
    this.tbody.removeChild(this.tbody.firstChild);
  }
};

Table.prototype._con_clear = function() {
  while (this.container.firstChild) {
    this.container.removeChild(this.container.firstChild);
  }
};

Table.prototype.show = function() {
  this._con_clear();
  this.container.style.display = "block";
  this.container.append(this.table);
};

Table.prototype.getTable = function() {
  return this.table;
};

Table.prototype.load = function() {
  // loader
  this._con_clear();
  this.container.append(this.loader);
};

Table.prototype.row = function(data) {
  // clear the body
  this.clear();
    
  // manipulate the body
  for (var x of data) {
    var tr = document.createElement("tr");
    
    for (var y of x) {
      console.log(typeof(y));
      var td = document.createElement("td");
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
  var tr = document.createElement("tr");
  for (var y of data) {
    var td = document.createElement("td");
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
  var tr = document.createElement("tr");
  for (var y of data) {
    var td = document.createElement("td");
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

  this.label = label;

  this.container = null;
  this.input = null;

  this.events = {};

  // initialized class

  this.container = document.createElement("div");
  this.container.style.marginTop = "3px";
  this.container.setAttribute("class", "input-group");

  var span = document.createElement("span");
  
  this.i = document.createElement("i");
  this.i.setAttribute("class", `fa fa-${this.icon}`);
  span.setAttribute("class", "input-group-addon");

  if (this.icon != null) {
    span.append(this.i);
  } else {
    span.innerHTML = this.label;
  }

  this.input = document.createElement("input");
  this.input.setAttribute("class", "form-control");
  this.input.setAttribute("type", this.type);
  
  if (this.hint != null) {
    this.input.setAttribute("data-toggle", "tooltip");
    this.input.setAttribute("title", this.hint);
  }

  this.input.setAttribute("placeholder", this.placeholder);

  this.container.append(span);
  this.container.append(this.input);
  
};

TextBox.prototype = Object.create(Interface.prototype);
TextBox.prototype.setPlaceHolder = function(t) {
  this.input.setAttribute("placeholder", t);
};
TextBox.prototype.setValue = function(value) {
  this.input.value = value;
};
TextBox.prototype.getValue = function() {
  return this.input.value;
};
TextBox.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this.input.addEventListener(evt, callback);
    }
    this.events[evt] = evt;
  }
};

// end text box

var Label = function(label) {
  this.label = label || "";
  this.container = document.createElement("label");
  this.container.innerHTML = this.label;
};
Label.prototype = Object.create(Interface.prototype);
Label.prototype.setValue = function(value) {
  this.container.innerHTML = value;
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

  this.label = label;

  this.container = null;
  this.input = null;
  this.events = {};

  // initialized class
  this.container = document.createElement("div");
  this.container.style.marginTop = "3px";
  this.container.setAttribute("class", "input-group");

  var span = document.createElement("span");
  
  this.i = document.createElement("i");
  this.i.setAttribute("class", `fa fa-${this.icon}`);
  span.setAttribute("class", "input-group-addon");

  if (this.icon != null) {
    span.append(this.i);
  } else {
    span.innerHTML = this.label;
  }

  this.input = document.createElement("select");
  this.input.setAttribute("class", "form-control");
  this.input.setAttribute("type", this.type);
  
  if (this.hint != null) {
    this.input.setAttribute("data-toggle", "tooltip");
    this.input.setAttribute("title", this.hint);
  }

  this.input.setAttribute("placeholder", this.placeholder);

  // all all the options in the placeholder
  for (var v of this.option) {
    this.add(v[0], v[1]);
  }
  this.container.append(span);
  this.container.append(this.input);    
};

ComboBox.prototype = Object.create(Interface.prototype);
ComboBox.prototype.setPlaceHolder = function(t) {
  this.input.setAttribute("placeholder", t);
};
ComboBox.prototype.setValue = function(value) {
  this.input.value = value;
}
ComboBox.prototype.getValue = function() {
  return this.input.value;
};
ComboBox.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this.input.addEventListener(evt, callback);
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
  var option = document.createElement("option");
  option.setAttribute("value", key);
  option.innerHTML = value;
  this.input.append(option);
  this.options.push(option);
};
// end combobox

// button
var Button = function(name, type, icon, hint) {
  // container

  this.hint = hint || null;
  // type danger, success, primary

  this.type = type || "default";
  this.name = name || "";
  this.icon = icon || "";

  this.events = {};
  
  this.container = document.createElement("button");
  this.container.setAttribute("class", `btn btn-${this.type}`);
  var i = document.createElement("i");
  if (this.icon != "") {
    i.style.marginRight = "5px";
  }
  if (this.hint != null) {
    this.container.setAttribute("data-toggle", "tooltip");
    this.container.setAttribute("title", this.hint);
  }
  i.setAttribute("class", `fa fa-${this.icon}`);
  var name = document.createElement("span");
  name.innerHTML = this.name;
  this.container.append(i);
  this.container.append(name);
};

Button.prototype = Object.create(Interface.prototype);
Button.prototype.addEventListener = function(evt, callback) {
  var ok = typeof(this.events[evt]) == "undefined";
  if (ok) {
    if (this.events[evt] != evt) {
      this.container.addEventListener(evt, callback);
    }
    this.events[evt] = evt;
  }
};
// end button


// modal
/*

  var dialog_con = document.createElement("div");
  dialog_con.setAttribute("class", "dialog_container");
  var dialog = document.createElement("div");
  dialog.setAttribute("class", "dialog_modal");

*/

var Panel = function(title) {
  this.container = document.createElement("div");
};
Panel.prototype = Object.create(Interface.prototype);
Panel.prototype.add = function(mcontrol_obj) {
  this.container.append(mcontrol_obj.getContainer());
};

var Modal = function(title, icon) {
  this.title = title || null;
  this.icon = icon || icon;

  this.container = null;
  this.dialog = null;
  this.body = null;

  // Intialized the class
  this.container = document.createElement("div");
  this.container.setAttribute("class", "dialog_container");
  
  this.dialog = document.createElement("div");
  this.dialog.setAttribute("class", "dialog_modal");
  
  var me = this;
  
  var close = document.createElement("button");
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
  
  var title = document.createElement("div");
  title.classList.add("title");
  title.style.position = "relative";
  title.innerHTML = `<i class="fa fa-${this.icon}"></i> ${this.title}`;
  title.append(close);

  this.dialog.append(title);
  // contents
  this.body = document.createElement("div");
  this.body.style.padding = "10px";
  this.body.style.position = "relative";
  this.dialog.append(this.body);
  // end contents
  this.container.append(this.dialog);
  
};

Modal.prototype = Object.create(Interface.prototype);
Modal.prototype.add = function(obj_element) {
  // only the above classes can be appended
  this.body.append(obj_element.getContainer());    
};



// alerts 
var MessageBox = function() {
  this.container = document.createElement("div");
  this.container.style.display = "none";
  this.container.style.backgroundColor = "rgba(0, 0, 0, 0.12)";
  this.container.style.zIndex = "1000";
  this.container.style.width = "100%";
  this.container.style.height = "100%";
  this.container.style.position = "fixed";
  this.container.style.left = "0";
  this.container.style.top = "0";

  this.card = document.createElement("div");
  this.card.style.position = "absolute";
  this.card.style.width = "360px";
  this.card.style.height = "200px";
  this.card.style.backgroundColor = "white";
  this.card.style.left = "0";
  this.card.style.right = "0";
  this.card.style.bottom = "0";
  this.card.style.top = "0";
  this.card.style.margin = "auto";
  this.card.style.borderRadius = "10px";
  this.card.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";

  this.ok = document.createElement("button");
  this.ok.innerHTML = "OK";
  this.ok.style.width = "100px";
  this.ok.style.height = "35px";
  this.ok.style.backgroundColor = "#16c4cd";
  this.ok.style.color = "white";
  this.ok.style.fontWeight = "bold";
  this.ok.style.border = "1px solid rgba(255, 255, 255, 0.3)";
  this.ok.style.position = "absolute";
  this.ok.style.left = "0";
  this.ok.style.right = "0";
  this.ok.style.bottom = "10px";
  this.ok.style.margin = "auto";

  this.label = document.createElement("label");
  this.label.style.position = "absolute";
  this.label.style.left = "0";
  this.label.style.right = "0";
  this.label.style.top = "10px";
  this.label.style.fontSize = "30pt";
  this.label.style.margin = "auto";
  this.label.style.width = "200px";
  this.label.style.height = "20pt";
  this.label.style.textAlign = "center";
  this.label.style.color = "#8f8787";
  this.label.style.fontWeight = "bold";

  this.msg = document.createElement("p");
  this.msg.style.position = "absolute";
  this.msg.style.left = "0";
  this.msg.style.right = "0";
  this.msg.style.top = "80px";
  this.msg.style.fontSize = "15pt";
  this.msg.style.margin = "auto";
  this.msg.style.width = "250px";
  this.msg.style.height = "20pt";
  this.msg.style.textAlign = "center";
  this.msg.style.color = "#8f8787";

  this.card.append(this.label);
  this.card.append(this.msg);
  this.card.append(this.ok);

  this.container.append(this.card);
  
  var me = this;
  this.callback = null;
  this.ok.addEventListener("click", function() {
    try {
      me.call_back();
      me.hide();
    } catch(er) {
      me.hide();
    }
  });
};

MessageBox.prototype = Object.create(Interface.prototype);

MessageBox.prototype.show = function(msg, _callback) {
  var type = type || "A l e r t !";
  var msg = msg || "";
  var _callback = _callback || undefined;
  this.container.style.display = "block";
  this.label.innerHTML = type;
  
  this.msg.innerHTML = msg;

  this.call_back = _callback;
};;
