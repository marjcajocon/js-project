// Table control
var Table = function(header) {

  this.id = null;

  this.setId = function(id) {
    this.id = id || null;
  };

  this.getId = function() {
    return this.id;
  };

  this.container = null;
  this.table = null;
  this.tbody = null;

  this.__header = header;

  this.getContainer = function() {
    return this.container;
  };

  this.getTable = function() {
    return this.table;
  };

  this.clear = function() {
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild);
    }
  };

  this.loader = null;

  this.load = function() {
    this._con_clear();
    this.container.append(this.loader);
  };  

  this.show = function() {
    this._con_clear();
    this.container.style.display = "block";
    this.container.append(this.table);
  };

  this.hide = function() {
    this.container.style.display = "none";
  };

  this._con_clear = function() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  };

  // update for the table
  this.row = function(data) {
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

  this.prepend = function(data) {
    var tr = document.createElement("tr");
    for (y of data) {
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

  this.append = function(data) {
    var tr = document.createElement("tr");
    for (y of data) {
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
  };

  this.init = function() {

    this.loader = document.createElement("div");
    this.loader.style.padding = "10px";
    this.loader.innerHTML = `<span class="loader"></span>`;

    var header = this.__header;;

    this.container = document.createElement("div");
    this.container.style.display = "none";
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
    // end initialized

    // inititalized the footer of the table
    // var tfoot = document.createElement("tfoot");
    // var tr = document.createElement("tr");
    // var th = document.createElement("th");
    // for (var x of header) {
    //   var th = document.createElement("th");
    //   th.innerHTML = x;
    //   tr.append(th);
    // }
    // tfoot.append(tr)
    // this.table.append(tfoot);
    // end footer

    this.container.append(this.table);
  };
  this.init();
};

// end of the table

// text box

var TextBox = function(label, type, icon, hint) {
  
  this.hint = hint || null;

  this.id = null;

  this.setId = function(id) {
    this.id = id || null;
  };

  this.getId = function() {
    return this.id;
  };

  this.i = null;
  this.icon = icon || null;
  this.type = type || "text";

  this.label = label;

  this.container = null;
  this.input = null;
  
  this.setPlaceHolder = function(t) {
    this.input.setAttribute("placeholder", t);
  };

  this.setValue = function(value) {
    this.input.value = value;
  }

  this.getValue = function() {
    return this.input.value;
  };

  this.events = {};

  this.addEventListener = function(evt, callback) {
    var ok = typeof(this.events[evt]) == "undefined";
    if (ok) {
      if (this.events[evt] != evt) {
        this.input.addEventListener(evt, callback);
      }
      this.events[evt] = evt;
    }
    
  };

  this.getContainer = function() {
    return this.container;
  };

  this.init = function() {
    this.container = document.createElement("div");
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

    this.container.append(span);
    this.container.append(this.input);    
  };
  
  this.init();
};
// end text box

// button
var Button = function(name, type, icon, hint) {

  this.hint = hint || null;
  // type danger, success, primary
  this.id = null;

  this.setId = function(id) {
    this.id = id;
  };

  this.getId = function() {
    return this.id;
  };

  this.type = type || "default";
  this.name = name || "";
  this.icon = icon || "";

  this.events = {};

  this.addEventListener = function(evt, callback) {
    var ok = typeof(this.events[evt]) == "undefined";
    if (ok) {
      if (this.events[evt] != evt) {
        this.container.addEventListener(evt, callback);
      }
      this.events[evt] = evt;
    }
  };
  
  this.init = function() {
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
  
  this.container = null;

  this.getContainer = function() {
    return this.container;
  };
  
  this.init();
};
// end button
