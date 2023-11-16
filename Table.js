var Table = function(header) {

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
  
  this.show = function() {
    this.container.style.display = "block";
  };

  this.hide = function() {
    this.container.style.display = "none";
  };

  // update for the table
  this.row = function(data) {
    // clear the body
    this.clear();
    
    // manipulate the body
    for (var x of data) {
      var tr = document.createElement("tr");
      
      for (var y of x) {
        var td = document.createElement("td");
        td.style.cursor = "pointer";
        td.innerHTML = y;
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
      td.innerHTML = y;
      tr.append(td);
    }
    this.tbody.prepend(tr);
  };

  this.append = function(data) {
    var tr = document.createElement("tr");
    for (y of data) {
      var td = document.createElement("td");
      td.style.cursor = "pointer";
      td.innerHTML = y;
      tr.append(td);
    }
    this.tbody.append(tr);
  };

  this.init = function() {
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
    var tfoot = document.createElement("tfoot");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    for (var x of header) {
      var th = document.createElement("th");
      th.innerHTML = x;
      tr.append(th);
    }
    tfoot.append(tr)
    this.table.append(tfoot);;
    // end footer

    this.container.append(this.table);
  };
  this.init();
};
