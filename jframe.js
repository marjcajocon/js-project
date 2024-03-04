
var _id = function(l) { // get the id of the element
	return document.getElementById(l);
};

var _c = function(l) { // create element
	return document.createElement(l);
};

// interface
var JInterface = function() {

};

JInterface.prototype.add = function(l) {
	this.c.appendChild(l.getWidget());
};
JInterface.prototype.setText = function(t) {
	this.c.appendChild(t);
};
JInterface.prototype.getWidget = function() {
	return this.c;
};
JInterface.prototype.setAttr = function(pkey, pval) {
	this.c.setAttribute(pkey, pval);
};
JInterface.prototype.setText = function(t) {
	if (this.jtype == "input" || this.jtype == "textarea") {
		this.c.value = t;
	}
	else 
	{
		this.c.innerHTML = t;
	}
};
JInterface.prototype.getText = function() {
	return this.c.value;
};
JInterface.prototype.event = function(e, c) {
	this.c.addEventListener(e, c);
};
JInterface.prototype.style = function(k, v) {
	this.c.style[k] = v;
};
JInterface.prototype.setStyle = function(o) {
	for (var i in o) {
		this.c.style[i] = o[i];
	}
};
// end interface

var JApplication = function(id) {
	this.c = _id(id);
};
JApplication.prototype = Object.create(JInterface.prototype);


var JPanel = function() {
	this.c = _c("div");
};

// Label
var JLabel = function(text) {
	this.c = _c("label");
	this.c.innerHTML = text;
};
JLabel.prototype = Object.create(JInterface.prototype);
// End Label

// button
var JButton = function() {
	this.c = _c("button");
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

