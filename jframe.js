var _id = function(l) { // get the id of the element
	return document.getElementById(l);
};

var _c = function(l) { // create element
	return document.createElement(l);
};

var _qs = function(l) {
	return document.querySelector(l);
};

// interface
var JInterface = function() {
};

JInterface.prototype.key = null;
JInterface.prototype.w = [];


JInterface.prototype.setKey = function(key) {
	this.key = key;
	return this;
}

JInterface.prototype.getKey = function() {
	return this.key;
};


JInterface.prototype.add = function(l, k) {
	var k = k || null;
	this.c.appendChild(l.getWidget());
	l.setKey(k);
	//this.w.push(l);
	this.w.push(l);
	return this;
};

JInterface.prototype.addClass = function(c) {
	this.c.classList.add(c);
	return this;
};

JInterface.prototype.removeClass = function(c) {
	this.c.classList.remove(c);
	return this;
};

JInterface.prototype.setText = function(t) {
	this.c.appendChild(t);
	return this;
};

JInterface.prototype.getWidget = function() {
	return this.c;
};

JInterface.prototype.setAttr = function(o) {
	for (var i in o) {
		this.c.setAttribute(i, o[i]);
	}
	return this;
};


JInterface.prototype.setText = function(t) {
	if (this.jtype == "input" || this.jtype == "textarea") {
		this.c.value = t;
	}
	else 
	{
		this.c.innerHTML = t;
	}
	return this;
};

JInterface.prototype.getText = function() {
	if (this.jtype == "input" || this.jtype == "textarea") {
		return this.c.value;
	} else {
		return this.c.innerHTML;
	}
};

JInterface.prototype.event = function(e, c) {
	this.c.addEventListener(e, c);
	return this;
};

JInterface.prototype.style = function(k, v) {
	this.c.style[k] = v;
	return this;
};

JInterface.prototype.setStyle = function(o) {
	for (var i in o) {
		this.c.style[i] = o[i];
	}
	return this;
};
// end interface

JInterface.prototype.clear = function() {
  while (this.c.firstChild) {
    this.c.removeChild(this.c.firstChild);
  }
};

var JErrorPage = function() {
	var panel = new JPanel();
	panel.setText('<h1>Sorry!</h1><span>Page Not Found!!!</span><br />');
	return panel;
};
JErrorPage.prototype = Object.create(JInterface);

var JApplication = function(id) {
	this.c = _id(id);
};

JApplication.prototype = Object.create(JInterface.prototype);

JApplication.prototype.routes = {};

JApplication.prototype.addRoute = function(url, w) {
	this.routes[url] = w;
	return this;
};
JApplication.prototype.run = function(w) {
	this.clear();
	this.add(w);
};

JApplication.prototype.navigate = function(url) {
	history.pushState(null, null, url);
	for (var i in this.routes) {
		if (i == url) {
			this.run(this.routes[i]);
			return;
		}
	}
	
	this.run(new JErrorPage());
};

JApplication.prototype.init = function() {
	if(location.hash.trim() == "") {
		location.href = "#";
		this.navigate("#");
		return;
	}
	this.navigate(location.hash);
};

var JPanel = function() {
	this.c = _c("div");
};

JPanel.prototype = Object.create(JInterface.prototype);

JPanel.prototype.getValue = function() {
	var len = this.w.length;
	var data = {};
	for (var i = 0; i < len; i++) {
	        if (this.w[i].key != null) {
	                data[this.w[i].key] = this.w[i].getText();
	        }
	}
	return data;
};
// Label

var JLabel = function(t) {
	var t  = t || "";
	this.c = _c("label");
	this.c.innerHTML = t;
};

JLabel.prototype = Object.create(JInterface.prototype);
// End Label

// button
var JButton = function(t) {
	this.c = _c("button");
	this.setText(t);
};
JButton.prototype = Object.create(JInterface.prototype);
// end button

var JInput = function() {
	this.jtype = "input";
	this.c = _c("input");
};
JInput.prototype = Object.create(JInterface.prototype);

// Textarea
var JTextArea  = function() {
	this.type = "textarea";
	this.c = _c("textarea");
};
JTextArea.prototype = Object.create(JInterface.prototype);

// end TextArea


// H1 to h6
var JH = function(h_no_tag) {
	this.c = _c("h" + h_no_tag.toString());
};
JH.prototype = Object.create(JInterface.prototype);
// end h1 to h6

// ul
var JUl = function() {
	this.c = _c("ul");
};
JUl.prototype = Object.create(JInterface.prototype);

// li
var JLi = function() {
	this.c = _c("li");
};
JLi.prototype = Object.create(JInterface.prototype);



// form
var JForm = function() {
	this.c = _c("form");
};

JForm.prototype = Object.create(JInterface.prototype);

JForm.prototype.getValue = function() {
	var len = this.w.length;
	var data = {};
	for (var i = 0; i < len; i++) {
		if (this.w[i].key != null) {
			data[this.w[i].key] = this.w[i].getText();
		}
	}
	return data;
};

// tables

var JTable = function() {
	this.c = _c("table");
};

JTable.prototype = Object.create(JInterface.prototype);

var JThead = function() {
	this.c = _c("thead");
};

JThead.prototype = Object.create(JInterface.prototype);

var JTr = function() {
	this.c = _c("tr");
};

JTr.prototype = Object.create(JInterface.prototype);


var JTh = function() {
	this.c = _c("th");
};

JTh.prototype = Object.create(JInterface.prototype);


var JTd = function() {
	this.c = _c("td");
};

JTd.prototype = Object.create(JInterface.prototype);


var JTbody = function() {
	this.c = _c("tbody");
};

JTbody.prototype = Object.create(JInterface.prototype);
